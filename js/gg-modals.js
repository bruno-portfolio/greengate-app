/**
 * GG Modals — PDF modal, register modal, help modal, UI wiring.
 * Depende de: gg-namespace.js, gg-helpers.js, gg-storage.js, gg-map.js, gg-validation.js
 */
(function() {
    'use strict';

    // ===================== PDF MODAL =====================
    function openPdfModal() {
        if (!GG.currentPolygon) { GG.showToast('Nenhum polígono'); return; }
        document.getElementById('pdfModal').classList.add('show');
    }

    function closePdfModal() {
        document.getElementById('pdfModal').classList.remove('show');
    }

    function downloadPDF() {
        var farmName = document.getElementById('farmName').value.trim();
        var plotName = document.getElementById('plotName').value.trim();

        if (!farmName || !plotName) {
            GG.showToast(GG.t('fillFarmPlot'));
            return;
        }

        var langRadio = document.querySelector('input[name="reportLang"]:checked');
        var lang = langRadio ? langRadio.value : 'pt';

        closePdfModal();

        var key = document.getElementById('apiKey').value.trim();
        if (!key) {
            GG.showToast(GG.t('insertApiKey'));
            return;
        }

        if (!GG.currentPolygon) { GG.showToast(GG.t('noPolygon')); return; }

        var btn = document.getElementById('pdfBtn');
        btn.disabled = true;
        btn.textContent = GG.t('pdfGenerating');

        var payload = {
            geometry: GG.currentPolygon,
            property_info: {
                farm_name: farmName,
                plot_name: plotName,
                municipality: GG.currentMeta ? GG.currentMeta.municipality : null,
                state: GG.currentMeta ? GG.currentMeta.state : null
            },
            lang: lang
        };

        fetch(GG.API_URL + '/api/v1/reports/due-diligence/quick', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            },
            body: JSON.stringify(payload)
        }).then(function(res) {
            if (!res.ok) throw new Error(GG.t('pdfError'));

            var reportCode = res.headers.get('X-Report-Code');
            if (reportCode) console.log('Código do relatório:', reportCode);

            return res.blob();
        }).then(function(blob) {
            var filename = 'GreenGate-' + farmName.replace(/\s+/g, '-') + '-' + plotName.replace(/\s+/g, '-') + '.pdf';
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = filename;
            a.click();
            GG.showToast(GG.t('pdfSuccess'), 'success');
        }).catch(function(err) {
            GG.showToast(err.message);
        }).finally(function() {
            btn.disabled = false;
            btn.textContent = GG.t('pdfBtn');
        });
    }

    // ===================== REGISTER MODAL =====================
    function openRegisterModal() {
        document.getElementById('registerModal').classList.add('show');
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerError').style.display = 'none';
        document.getElementById('registerSuccess').style.display = 'none';
        document.getElementById('confirmRegisterBtn').disabled = false;
        document.getElementById('confirmRegisterBtn').textContent = 'Criar Minha API Key';
    }

    function closeRegisterModal() {
        document.getElementById('registerModal').classList.remove('show');
    }

    function isValidEmail(email) {
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

        if (!emailRegex.test(email)) return { valid: false, reason: 'Formato de email inválido.' };

        var domain = email.split('@')[1].toLowerCase();

        var blockedDomains = [
            'tempmail.com', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
            'throwaway.email', 'fakeinbox.com', 'trashmail.com', 'temp-mail.org',
            'yopmail.com', 'sharklasers.com', 'guerrillamail.info', 'grr.la',
            'dispostable.com', 'mailnesia.com', 'maildrop.cc', 'getairmail.com',
            'mohmal.com', 'tempail.com', 'tempr.email', 'discard.email',
            'discardmail.com', 'spamgourmet.com', 'mytemp.email', 'mt2009.com'
        ];

        if (blockedDomains.indexOf(domain) !== -1) {
            return { valid: false, reason: 'Emails temporários não são permitidos. Use seu email real.' };
        }

        if (domain.indexOf('.') === -1 || domain.charAt(domain.length - 1) === '.' || domain.charAt(0) === '.') {
            return { valid: false, reason: 'Domínio de email inválido.' };
        }

        var tld = domain.split('.').pop();
        if (tld.length < 2) {
            return { valid: false, reason: 'Extensão de domínio inválida.' };
        }

        return { valid: true };
    }

    function registerApiKey() {
        var email = document.getElementById('registerEmail').value.trim().toLowerCase();
        var errorEl = document.getElementById('registerError');
        var successEl = document.getElementById('registerSuccess');
        var btn = document.getElementById('confirmRegisterBtn');

        if (!email) {
            errorEl.textContent = 'Por favor, insira seu email.';
            errorEl.style.display = 'block';
            successEl.style.display = 'none';
            return;
        }

        var validation = isValidEmail(email);
        if (!validation.valid) {
            errorEl.textContent = validation.reason;
            errorEl.style.display = 'block';
            successEl.style.display = 'none';
            return;
        }

        btn.disabled = true;
        btn.textContent = 'Criando...';
        errorEl.style.display = 'none';

        fetch(GG.API_URL + '/api/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        }).then(function(res) {
            return res.json().then(function(data) {
                if (!res.ok) {
                    var errorMsg = (data.detail && data.detail.message) || data.detail || 'Erro ao criar API key';
                    throw new Error(errorMsg);
                }

                document.getElementById('apiKey').value = data.api_key;

                if (GG.cookieConsentGiven) {
                    localStorage.setItem('gg_api_key', data.api_key);
                }

                successEl.textContent = '';
                successEl.appendChild(document.createTextNode('API Key criada! '));
                var boldEl = document.createElement('strong');
                boldEl.textContent = 'Guarde-a em local seguro.';
                successEl.appendChild(boldEl);
                successEl.appendChild(document.createElement('br'));
                successEl.appendChild(document.createTextNode('Você tem ' + data.quota + ' validações gratuitas.'));
                successEl.style.display = 'block';
                btn.textContent = 'Criado!';

                setTimeout(function() {
                    closeRegisterModal();
                    GG.showToast('API Key configurada! Você pode validar áreas agora.', 'success');
                }, 2500);
            });
        }).catch(function(err) {
            errorEl.textContent = err.message;
            errorEl.style.display = 'block';
            btn.disabled = false;
            btn.textContent = 'Criar Minha API Key';
        });
    }

    // ===================== HELP MODAL =====================
    var modal = document.getElementById('helpModal');
    function toggleModal(s) {
        if (s) modal.classList.add('show');
        else { modal.classList.remove('show'); localStorage.setItem('gg_tutorial', '1'); }
    }

    // ===================== WIRE UP EVENT HANDLERS =====================
    document.getElementById('helpBtn').onclick = function() { toggleModal(true); };
    document.getElementById('closeHelp').onclick = function() { toggleModal(false); };
    document.getElementById('startBtn').onclick = function() { toggleModal(false); };

    document.getElementById('closePdfModal').onclick = closePdfModal;
    document.getElementById('confirmPdfBtn').onclick = downloadPDF;
    document.getElementById('validateBtn').onclick = GG.validate;
    document.getElementById('pdfBtn').onclick = openPdfModal;

    document.getElementById('getApiKeyBtn').onclick = openRegisterModal;
    document.getElementById('closeRegisterModal').onclick = closeRegisterModal;
    document.getElementById('confirmRegisterBtn').onclick = registerApiKey;

    document.getElementById('registerEmail').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') registerApiKey();
    });

    document.getElementById('registerModal').onclick = function(e) {
        if (e.target.id === 'registerModal') closeRegisterModal();
    };

    // Toggle eye icon
    document.getElementById('toggleKey').onclick = function(e) {
        e.preventDefault();
        var inp = document.getElementById('apiKey');
        inp.type = inp.type === 'password' ? 'text' : 'password';
        var btn = document.getElementById('toggleKey');
        btn.textContent = '';
        btn.appendChild(GG.createSvgIcon(inp.type === 'password' ? 'eye' : 'eye-off'));
    };

    // File upload handler
    document.getElementById('fileInput').onchange = function(e) {
        var f = e.target.files[0]; if (!f) return;
        document.getElementById('fileName').textContent = f.name;
        document.getElementById('fileName').classList.add('show');
        document.getElementById('uploadArea').classList.add('has-file');

        var r = new FileReader();
        r.onload = function(ev) {
            try {
                var j = JSON.parse(ev.target.result);
                window.loadGeoJSON(j.type === 'FeatureCollection' ? j.features[0].geometry : j.type === 'Feature' ? j.geometry : j);
            } catch (err) { GG.showToast(GG.t('errorUpload') + err.message); }
        };
        r.readAsText(f);
    };

    // Test example button
    document.getElementById('testExampleBtn').onclick = function() {
        var exampleGeometry = {
            type: "Polygon",
            coordinates: [GG.EXAMPLE_COORDS]
        };

        window.loadGeoJSON(exampleGeometry);
        document.getElementById('fileName').textContent = GG.t('areaFileName');
        document.getElementById('fileName').classList.add('show');
        document.getElementById('uploadArea').classList.add('has-file');
        GG.showToast(GG.t('sampleLoaded'), 'success');
    };

    // Export GeoJSON
    document.getElementById('exportBtn').onclick = function() {
        if (!GG.currentPolygon) { GG.showToast(GG.t('noPolygon')); return; }
        var gj = { type: "Feature", properties: { source: "GreenGate", exported: new Date().toISOString() }, geometry: GG.currentPolygon };
        var blob = new Blob([JSON.stringify(gj, null, 2)], { type: 'application/json' });
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'area-' + Date.now() + '.geojson'; a.click();
        GG.showToast(GG.t('geojsonExported'), 'success');
    };

    // Clear history
    document.getElementById('clearHistory').onclick = function() {
        if (confirm(GG.t('clearHistoryConfirm'))) { localStorage.removeItem('gg_history'); GG.renderHistory(); }
    };

    // Window exports
    window.openRegisterModal = openRegisterModal;
})();
