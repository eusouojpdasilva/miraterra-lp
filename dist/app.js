const form = document.querySelector('#safari-form');
const fields = [...form.querySelectorAll('fieldset')];
const labels = ['SUA EXPERIÊNCIA','SUA MELHOR ÉPOCA','SEU PLANEJAMENTO','VAMOS CONVERSAR'];
let step = 0;
function showStep(next) {
  step = next;
  fields.forEach((field,index)=>{field.hidden = index !== step;field.disabled = index !== step;});
  document.querySelector('#step-label').textContent = labels[step];
  document.querySelector('#step-count').textContent = `0${step+1} / 04`;
  document.querySelector('.progress').setAttribute('aria-valuenow',step+1);
  document.querySelector('.progress>span').style.width = `${(step+1)*25}%`;
  document.querySelector('#back').hidden = step === 0;
  document.querySelector('#form-hint').hidden = step !== 0;
  form.querySelector('button[type="submit"]').hidden = step !== 3;
  fields[step].querySelector('legend').focus({preventScroll:true});
}
form.querySelectorAll('.answer').forEach(answer=>answer.addEventListener('click',()=>{
  const currentField = fields[step];
  if(step >= 3 || !currentField.contains(answer)) return;
  currentField.querySelectorAll('.answer').forEach(option=>option.setAttribute('aria-pressed',String(option === answer)));
  showStep(step+1);
}));
document.querySelector('#back').addEventListener('click',()=>showStep(step-1));
const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
nameInput.addEventListener('input',()=>nameInput.setCustomValidity(nameInput.value.trim().length < 2 ? 'Informe seu nome.' : ''));
phoneInput.addEventListener('input',()=>{const digits=phoneInput.value.replace(/\D/g,'');phoneInput.setCustomValidity(digits.length < 10 || digits.length > 15 ? 'Informe um WhatsApp válido com DDD.' : '');});
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(step !== 3 || !form.reportValidity()) return;
  const selected = name => form.querySelector(`button[name="${name}"][aria-pressed="true"]`).value;
  const message = `Olá, Carlos! Quero meu roteiro de safári pela MiraTerra.\n\nNome: ${nameInput.value.trim()}\nWhatsApp: ${phoneInput.value.trim()}\nExperiência: ${selected('experience')}\nQuando pretendo viajar: ${selected('when')}\nPassagens: ${selected('tickets')}`;
  const url = `https://wa.me/5561981784728?text=${encodeURIComponent(message)}`;
  document.querySelector('#whatsapp-link').href = url;
  document.querySelector('#submission-status').hidden = false;
  window.open(url,'_blank','noopener,noreferrer');
});
document.querySelectorAll('.faq details').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('.faq details').forEach(other=>{if(other!==item)other.open=false;});}));
document.querySelector('#year').textContent = new Date().getFullYear();
if(document.modelContext?.registerTool){
  const lifecycle = new AbortController();
  try{Promise.resolve(document.modelContext.registerTool({name:'start_safari_application',title:'Iniciar aplicação de safári',description:'Abre a primeira etapa da aplicação na página. Não envia dados nem mensagens.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input || typeof input!=='object' || Array.isArray(input) || Object.keys(input).length)throw new Error('Esta ação não recebe parâmetros.');showStep(0);document.querySelector('#aplicacao').scrollIntoView({behavior:'instant'});return {step:1,totalSteps:4};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.body.classList.add('motion');
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
}
