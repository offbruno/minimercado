
// ====== JavaScript Fase 2 ======
(function () {
    // Relógio em tempo real
    const clockEl = document.getElementById('clock');
    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        const fmt = now.toLocaleString('pt-BR', {
            weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });
        clockEl.textContent = fmt;
    }
    updateClock();
    setInterval(updateClock, 60 * 1000);

    // Restrições de data/hora do agendamento
    const dataInput = document.getElementById('data');
    const horaInput = document.getElementById('hora');
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    if (dataInput) dataInput.min = minDate;            // bloqueia datas passadas
    if (horaInput) {
        horaInput.min = '08:00';
        horaInput.max = '20:00';
        horaInput.step = 1800; // 30 minutos
    }

    // Validação simples do formulário
    const form = document.getElementById('formCadastro');
    if (form) {
        form.addEventListener('submit', function (e) {
            // Normaliza CPF para conter apenas dígitos e valida 11 dígitos
            const cpfEl = document.getElementById('cpf');
            if (cpfEl) {
                cpfEl.value = (cpfEl.value || '').replace(/\D/g, '');
                if (cpfEl.value.length !== 11) {
                    cpfEl.setCustomValidity('CPF deve conter 11 dígitos numéricos.');
                } else {
                    cpfEl.setCustomValidity('');
                }
            }

            // Ativa validação nativa
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            e.preventDefault(); // demonstração: não envia a um backend
            form.classList.remove('was-validated');
            alert('Cadastro enviado com sucesso!');
            form.reset();
            // Mantém restrições após reset
            if (dataInput) dataInput.min = minDate;
            if (horaInput) {
                horaInput.min = '08:00';
                horaInput.max = '20:00';
                horaInput.step = 1800;
            }
        });
    }
})();