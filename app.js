const STORAGE_KEY = 'northstar-pricing-studio-v3';
const PREVIOUS_KEY = 'northstar-pricing-studio-v2';
const LEGACY_KEY = 'northstar-pricing-studio-v1';
const DEFAULTS_VERSION_KEY = 'northstar-pricing-studio-defaults-v2';
const MODULES = { image: '图片', video: '视频', music: '音乐', text: '文本' };
const modelRows = [
  ['GPT系列','gpt-5.6-terra','0.021 / 0.029 / 0.029 / 0.016 / 0.014',.021,15,2.5,15,.25,.9653,.32],
  ['GPT系列','gpt-5.6-sol','0.021 / 0.029 / 0.029 / 0.016 / 0.014',.021,14,5,30,.5,.9629,.59],
  ['GPT系列','gpt-5.6-luna','0.021 / 0.029 / 0.029 / 0.016 / 0.014',.021,16.5,1,6,.1,.9685,.14],
  ['GPT系列','gpt-5.5','0.021 / 0.029 / 0.029 / 0.016 / 0.014',.021,14,5,30,.5,.9629,.59],
  ['GPT系列','gpt-5.4-mini','0.021 / 0.029 / 0.029 / 0.016 / 0.014',.021,16.5,.75,4.5,.075,.9685,.1],
  ['GPT系列','gpt-5.4','0.021 / 0.029 / 0.029 / 0.016 / 0.014',.021,15,2.5,15,.25,.9653,.32],
  ['Claude系列','claude-sonnet-5','0.142 / 0.186 / 0.121',.142,2.1,2,10,.2,.7524,.21],
  ['Claude系列','claude-sonnet-4.6','0.142 / 0.186 / 0.121',.142,2.4,3,15,.3,.7833,.36],
  ['Claude系列','claude-sonnet-4-6','0.142 / 0.186 / 0.121',.142,2.4,3,15,.3,.7833,.36],
  ['Claude系列','claude-opus-4.8','0.142 / 0.186 / 0.121',.142,2.3,5,25,.5,.7739,.58],
  ['Claude系列','claude-opus-4.7','0.142 / 0.186 / 0.121',.142,2.3,5,25,.5,.7739,.58],
  ['Claude系列','claude-opus-4-7','0.142 / 0.186 / 0.121',.142,2.3,5,25,.5,.7739,.58],
  ['Claude系列','claude-opus-4-6','0.142 / 0.186 / 0.121',.142,2.3,5,25,.5,.7739,.58],
  ['Claude系列','claude-fable-5','0.142 / 0.186 / 0.121',.142,2.1,10,50,1,.7524,1.06],
  ['Gemini系列','gemini-3.5-flash','0.086 / 0.257 / 0.071',.086,4,1,5,.2,.87,.15],
  ['Gemini系列','gemini-2.5-flash','0.086',.086,4,.3,2.5,.03,.87,.05],
  ['Kimi系列','kimi-k3','1',1,2.05,3,15,.3,.7463,2.18],
  ['Kimi系列','kimi-k2.6','1',1,2.1,.7,3.5,.38,.7524,1.13],
  ['Kimi系列','kimi-k2.5','1',1,2.15,.3827,1.72,.1914,.7581,.58],
  ['DeepSeek系列','deepseek-v4-flash','1',1,2,.166,.333,.0333,.74,.1],
  ['MiniMax系列','MiniMax-M2.5','1',1,2.1,.2877,1.1497,.029,.7524,.18],
  ['Qwen系列','qwen3.7-flash','1',1,2.2,.03,.13,.006,.7636,.03],
  ['其他','auto','1',1,2,2.5,15,.25,.74,2.02]
].map((row, index) => ({ id:`model-${index+1}`, series:row[0], name:row[1], quote:row[2], procurement:row[3], token:row[4], baseSt:row[3]*row[4], input:row[5], output:row[6], cache:row[7], baseMargin:row[8], sourceSpeed:row[9] }));

const aigcRows = [
  ['image','Seedream 4.5',[['2K、4K',.27]]],
  ['image','Seedream 5.0 lite',[['2K、4K',.24]]],
  ['image','Gemini 3 Pro Image',[['1K、2K',.90],['4K',1.61]]],
  ['image','Gemini 3.1 Flash Image',[['1K',.45],['2K',.68],['4K',1.01]]],
  ['image','GPT Image 2',[['1K',.36],['2K','待核实'],['4K','尺寸支持及价格待核实']]],
  ['image','Qwen Image 2.0',[['1K',.24]]],
  ['video','Seedance 2.0',[['480P；16:9；5 秒',2.31],['720P；16:9；5 秒',4.97],['1080P；16:9；5 秒',12.39]]],
  ['video','Seedance 2.0 Fast',[['480P；16:9；5 秒',2.31],['720P；16:9；5 秒',4.97],['1080P；16:9；5 秒',12.39]]],
  ['video','HappyHorse 1.1',[['480P',.45],['720P',.9],['1080P',1.2]]],
  ['video','Kling V3 Omni',[['720P；无参考视频',.9],['1080P；无参考视频',1.2],['720P；有参考视频',.9],['1080P；有参考视频',1.2],['720P；无声；无参考视频',.6],['1080P；无声；无参考视频',.8]]],
  ['video','Kling V3',[['720P',.9],['1080P',1.2],['720P；无声',.6],['1080P；无声',.8]]],
  ['music','suno V5.5',[['默认规格',.42]]]
].map(([module,name,conditions],mi)=>({id:`aigc-${mi+1}`,module,name,conditions:conditions.map(([spec,cost],ci)=>({id:`aigc-${mi+1}-c${ci+1}`,spec,cost:typeof cost==='number'?cost:'',priceNote:typeof cost==='string'?cost:'',profit:1,marketPrice:''}))}));

const seed = {
  fx: 1.7, pointsPerYuan: 25, billing: 'month', activeModule: 'image',
  plans: [
    { id:'p1', name:'普通版', desc:'适合个人日常任务与稳定的积分补充。', price:98, listPrice:1200, monthDiscount:0, annualDiscount:20, basePoints:2500, giftRate:30, features:['全部模型可选','同时运行 1 个任务'] },
    { id:'p2', name:'高级版', desc:'适合复杂任务、密集创作与多任务协同。', price:198, listPrice:2400, monthDiscount:0, annualDiscount:20, basePoints:5000, giftRate:30, features:['全部模型可选','同时运行 3 个任务','高峰期优先保障'] }
  ],
  topups: [
    { id:'t1', name:'轻量补充', points:1250, giftRate:0, price:50, discount:0 }
  ],
  models: modelRows,
  aigc: aigcRows,
  agents: [
    { id:'g1', name:'日报智能体', steps:[
      { id:'s11', name:'分析个人报告', limit:'附件 20MB × 5', cost:.25, profit:2.5, unit:'篇报告' },
      { id:'s12', name:'汇总行业报告', limit:'行业简报、知识库、个人报告', cost:.013, profit:2.5, unit:'条汇总' },
      { id:'s13', name:'采集行业动态', limit:'24 次 / 天 · 20 条 / 次', cost:.7, profit:3.6, unit:'次采集' },
      { id:'s14', name:'存入知识库', limit:'附件 × 5', cost:.01, profit:2.5, unit:'条知识' }
    ] },
    
  ]
};

const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const n = value => Number.isFinite(Number(value)) ? Number(value) : 0;
const safe = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money = (value, digits=2) => `¥${n(value).toLocaleString('zh-CN',{minimumFractionDigits:digits,maximumFractionDigits:digits})}`;
const points = value => `${Math.round(n(value)).toLocaleString('zh-CN')} 积分`;
const pct = value => `${(n(value)*100).toFixed(1)}%`;
const multiple = value => `${n(value).toFixed(2)}×`;
const effectiveProfit = profit => Math.max(.0001,n(profit)*n(data.fx));
const grossMargin = profit => 1-1/effectiveProfit(profit);
const uid = prefix => `${prefix}-${Math.random().toString(36).slice(2,9)}`;

let data;
try {
  const current = localStorage.getItem(STORAGE_KEY);
  if (current) data = JSON.parse(current);
  else {
    const legacy = JSON.parse(localStorage.getItem(PREVIOUS_KEY) || localStorage.getItem(LEGACY_KEY) || 'null');
    data = structuredClone(seed);
    if (legacy) {
      data.fx = legacy.fx ?? data.fx;
      data.pointsPerYuan = legacy.pointsPerYuan ?? data.pointsPerYuan;
      data.billing = legacy.billing || data.billing;
      data.plans = legacy.plans || data.plans;
      data.topups = (legacy.topups || data.topups).filter(pack=>!['t2','t3'].includes(pack.id));
      data.agents = legacy.agents || data.agents;
      data.aigc = structuredClone(aigcRows);
      data.models = legacy.models || structuredClone(modelRows);
    }
  }
} catch { data = structuredClone(seed); }
if(localStorage.getItem(DEFAULTS_VERSION_KEY)!=='4'){
  if(n(data.fx)===1.2)data.fx=1.5;
  if(n(data.fx)===1.5)data.fx=1.7;
  if(n(data.pointsPerYuan)===100)data.pointsPerYuan=25;
  data.topups=(data.topups||[]).map(pack=>pack.id==='t1'&&n(pack.points)===5000?{...pack,points:1250}:pack);
  data.plans=(data.plans||[]).map(plan=>((plan.id==='p1'&&n(plan.annualDiscount)===20.2)||(plan.id==='p2'&&n(plan.annualDiscount)===20.1))?{...plan,annualDiscount:20}:plan);
  localStorage.setItem(DEFAULTS_VERSION_KEY,'4');
}
data.pointsPerYuan = n(data.pointsPerYuan) || 25;
data.agents = (data.agents || []).filter(agent=>agent.id!=='g2');
data.topups = (data.topups || []).filter(pack=>!['t2','t3'].includes(pack.id)).map(pack=>({...pack,price:n(pack.price)*(1-n(pack.discount)/100),discount:0}));
if (!localStorage.getItem(STORAGE_KEY)) data.aigc = structuredClone(aigcRows);
data.aigc = (data.aigc || []).map(model=>({...model,conditions:(model.conditions||[]).map(condition=>({...condition,marketPrice:condition.marketPrice??'',priceNote:condition.priceNote||''}))}));
data.plans = (data.plans || []).map(plan => ({...plan, features:Array.isArray(plan.features)?plan.features:String(plan.features||'').split('\n').filter(Boolean), monthDiscount:n(plan.monthDiscount), annualDiscount:n(plan.annualDiscount)}));

function persist(){localStorage.setItem(STORAGE_KEY,JSON.stringify(data));$('#saveStatus').textContent='已保存到本地';}
function toast(message){const stack=$('#toast'),item=document.createElement('div');item.className='toast-message';item.textContent=message;stack.append(item);requestAnimationFrame(()=>item.classList.add('show'));setTimeout(()=>{item.classList.remove('show');setTimeout(()=>item.remove(),220);},3000);}
function changed(message){persist();render();if(message)toast(message);}
const numericFieldNames={fx:'积分汇率',pointsPerYuan:'1 元兑换积分',price:'售价',annualDiscount:'年付折扣率',monthDiscount:'月付折扣率',basePoints:'每月基础积分',giftRate:'赠送率',points:'充值积分',procurement:'中位供应成本倍率',token:'Token 倍率',input:'官方输入价',output:'官方输出价',cache:'缓存读价',cost:'模型成本',profit:'盈利倍数',marketPrice:'市场价'};
function numericFieldLabel(input){return input.getAttribute('aria-label')||input.closest('.mini-field')?.querySelector('label')?.textContent||input.closest('.step-field')?.querySelector('label')?.textContent||numericFieldNames[input.dataset.key||input.dataset.modelKey||input.dataset.stepKey]||'参数';}
function numericFieldValue(input,value){const wrap=input.closest('.input-wrap'),prefix=wrap?.querySelector('.prefix')?.textContent||'',suffix=wrap?.querySelector('.suffix')?.textContent||'';return `${prefix}${value}${suffix}`;}
document.addEventListener('focusin',event=>{const input=event.target;if(input instanceof HTMLInputElement&&input.type==='number'&&!input.readOnly&&!input.__pendingEnter)input.__committedValue=input.value;},true);
document.addEventListener('input',event=>{const input=event.target;if(!(input instanceof HTMLInputElement)||input.type!=='number'||input.readOnly||input.__enterCommit)return;event.stopImmediatePropagation();if(input.__committedValue===undefined)input.__committedValue=input.getAttribute('value')||'';input.__pendingEnter=true;},true);
document.addEventListener('change',event=>{const input=event.target;if(input instanceof HTMLInputElement&&input.type==='number'&&!input.readOnly&&input.__pendingEnter&&!input.__enterCommit){event.stopImmediatePropagation();event.preventDefault();}},true);
document.addEventListener('keydown',event=>{const input=event.target;if(!(input instanceof HTMLInputElement)||input.type!=='number'||input.readOnly)return;if(event.key==='Escape'&&input.__pendingEnter){event.preventDefault();input.value=input.__committedValue;input.__pendingEnter=false;return;}if(event.key!=='Enter'||!input.__pendingEnter)return;event.preventDefault();if(!input.reportValidity())return;const before=input.__committedValue,after=input.value;input.__pendingEnter=false;input.__enterCommit=true;input.dispatchEvent(new Event('input',{bubbles:true}));input.__enterCommit=false;input.dispatchEvent(new Event('change',{bubbles:true}));const label=numericFieldLabel(input);if(before!==after)toast(`${label}：${numericFieldValue(input,before)} → ${numericFieldValue(input,after)}`);input.__committedValue=after;},true);
document.addEventListener('focusout',event=>{const input=event.target;if(input instanceof HTMLInputElement&&input.type==='number'&&!input.readOnly&&input.__pendingEnter){input.value=input.__committedValue;input.__pendingEnter=false;}},true);
function miniField(label,key,value,{prefix='',suffix='',step='.01',min='0',type='number'}={}){
 return `<div class="mini-field"><label>${label}</label><div class="input-wrap">${prefix?`<span class="prefix">${prefix}</span>`:''}<input type="${type}" ${type==='number'?`min="${min}" step="${step}"`:''} data-key="${key}" value="${safe(value)}">${suffix?`<span class="suffix">${suffix}</span>`:''}</div></div>`;
}
function renderSummary(){
 $('#summaryFx').textContent=n(data.fx).toFixed(2);
 $('#summaryPointsPerYuan').textContent=n(data.pointsPerYuan).toLocaleString('zh-CN');
 $('#pointFx').value=data.fx;
 $('#pointsPerYuan').value=data.pointsPerYuan;
 for(const key of Object.keys(MODULES)) $(`#${key}Count`).textContent=data.aigc.filter(model=>model.module===key).length;
}
function planPeriodPricing(plan,annual=false){
 const monthlyBase=n(plan.price),monthlyFinal=monthlyBase*(1-n(plan.monthDiscount)/100);
 const basePrice=annual?monthlyFinal*12:monthlyBase,discount=annual?n(plan.annualDiscount):n(plan.monthDiscount);
 return {basePrice,discount,finalPrice:annual?basePrice*(1-discount/100):monthlyBase*(1-discount/100),periods:annual?12:1};
}
function renderPlans(){
 const annual=data.billing==='year';
 const discounts=data.plans.map(plan=>n(plan.annualDiscount));
 const low=discounts.length?Math.min(...discounts):0,high=discounts.length?Math.max(...discounts):0;
 const discountText=low===high?`${low.toFixed(1)}%`:`${low.toFixed(1)}%–${high.toFixed(1)}%`;
 $('#billingSwitch').innerHTML=`<button data-billing="month" class="${annual?'':'selected'}">1个月</button><button data-billing="year" class="${annual?'selected':''}">1年 <span class="save-badge">省 ${discountText}</span></button>`;
 $('#planGrid').innerHTML=data.plans.length?data.plans.map((plan,index)=>{
   const pricing=planPeriodPricing(plan,annual),listPrice=pricing.basePrice,discount=pricing.discount,price=pricing.finalPrice,periods=pricing.periods;
   const credits=(n(plan.basePoints)*(1+n(plan.giftRate)/100))*periods;
   const estimatedCost=credits/Math.max(.01,n(data.fx))/Math.max(.01,n(data.pointsPerYuan));
   const margin=price>0?1-estimatedCost/price:0;
   const features=Array.isArray(plan.features)?plan.features:String(plan.features||'').split('\n').filter(Boolean);
   return `<article class="plan-card ${index===1?'recommended':''}" data-id="${plan.id}">
    <div class="plan-card-top"><span class="plan-icon">${index===1?'✧':'◉'}</span><div class="plan-card-actions"><span class="plan-badge">${index===1?'推荐':'轻量使用'}</span><button class="row-delete plan-delete" data-delete="plan" data-id="${plan.id}" title="删除方案">×</button></div></div>
    <div class="plan-title-row"><input class="plan-name" data-key="name" required aria-label="方案名称" value="${safe(plan.name)}"></div>
    <input class="plan-desc-input" data-key="desc" aria-label="方案描述" value="${safe(plan.desc)}">
    <div class="plan-price-row"><span class="currency">¥</span><span class="plan-price">${price.toLocaleString('zh-CN',{maximumFractionDigits:2})}</span><span class="price-unit">/${annual?'年':'月'}</span>${discount?`<span class="was-price">¥${listPrice.toLocaleString('zh-CN')}</span><span class="save-label">省 ¥${(listPrice-price).toLocaleString('zh-CN',{maximumFractionDigits:2})}</span>`:''}</div>
    <button class="plan-cta">立即订阅</button>
    <ul class="plan-points"><li><span class="check-mark">✓</span><span><b>${(n(plan.basePoints)*periods).toLocaleString('zh-CN')}</b> ${annual?'每年':'每月'}基础积分</span></li><li><span class="check-mark">✓</span><span><b>${(n(plan.basePoints)*n(plan.giftRate)/100*periods).toLocaleString('zh-CN')}</b> ${annual?'每年':'每月'}赠送积分</span></li>${features.map((text,i)=>`<li><span class="check-mark">✓</span><input class="feature-text" data-feature-index="${i}" value="${safe(text)}" aria-label="订阅权益"><button class="row-delete feature-delete" data-delete-feature="${i}" data-id="${plan.id}" title="删除权益">×</button></li>`).join('')}</ul>
    <button class="text-button feature-add" data-add-feature="${plan.id}">＋ 添加权益</button>
    <div class="editable-plan-fields">${annual?`<div class="mini-field"><label>月付 × 12 基准价</label><div class="input-wrap"><span class="prefix">¥</span><input value="${safe(listPrice.toFixed(2))}" readonly aria-label="月付乘以12基准价"></div></div>`:miniField('月付原价','price',plan.price,{prefix:'¥'})}${miniField(annual?'年付折扣率':'月付折扣率',annual?'annualDiscount':'monthDiscount',discount,{suffix:'%',step:'.1'})}${miniField('每月基础积分','basePoints',plan.basePoints,{suffix:'分',step:'100'})}${miniField('赠送率','giftRate',plan.giftRate,{suffix:'%',step:'1'})}</div>
    <div class="plan-bottom"><span class="margin-label">预计毛利率<strong>${pct(margin)}</strong></span><span class="plan-cost">估算积分成本 ${money(estimatedCost)}</span></div>
   </article>`;
 }).join(''):'<div class="empty-state">还没有订阅方案，点击「新增方案」开始配置。</div>';
 $('#topupGrid').innerHTML=data.topups.length?data.topups.map((pack,index)=>{
   const total=n(pack.points)*(1+n(pack.giftRate)/100),price=n(pack.price);
   const cost=total/Math.max(.01,n(data.fx))/Math.max(.01,n(data.pointsPerYuan));
   return `<article class="topup-card ${index===0?'selected':''}" data-id="${pack.id}"><div class="topup-card-header"><span class="topup-name"><input data-key="name" value="${safe(pack.name)}" aria-label="加量包名称"></span><button class="row-delete" data-delete="topup" data-id="${pack.id}">×</button></div><div class="topup-primary-row"><div class="topup-credits">${Math.round(total).toLocaleString('zh-CN')}<small>积分</small></div><div class="topup-price">充值 <b>${money(price)}</b></div></div><div class="topup-fields">${miniField('充值积分','points',pack.points,{step:'100',suffix:'分'})}${miniField('赠送率','giftRate',pack.giftRate,{step:'1',suffix:'%'})}${miniField('售价','price',pack.price,{prefix:'¥'})}</div><div class="topup-foot"><span>预计毛利率</span><b>${pct(price>0?1-cost/price:0)}</b></div></article>`;
 }).join(''):'<div class="empty-state">还没有加量包，点击「添加加量包」开始配置。</div>';
 bindRows('#planGrid',data.plans);bindRows('#topupGrid',data.topups);
 $$('#planGrid [data-feature-index]').forEach(input=>input.addEventListener('input',()=>{const plan=data.plans.find(row=>row.id===input.closest('[data-id]').dataset.id);if(plan)plan.features[Number(input.dataset.featureIndex)]=input.value;persist();}));
 $$('#planGrid [data-feature-index]').forEach(input=>input.addEventListener('change',()=>renderPlans()));
}
function bindRows(selector,rows){
 $$(selector+' [data-key]').forEach(input=>{
   input.addEventListener('input',()=>{const row=rows.find(item=>item.id===input.closest('[data-id]').dataset.id);if(!row)return;const value=input.type==='number'?n(input.value):input.value;if(input.dataset.key==='name'&&!String(value).trim())return;row[input.dataset.key]=value;persist();});
   input.addEventListener('change',()=>render());
 });
}
function modelCalc(model){
 const weighted=n(model.input)*.01+n(model.cache)*.94+n(model.output)*.05;
 const st=n(model.procurement)*n(model.token), final=st*n(data.fx);
 const margin=final>0?(final-n(model.procurement))/final:0;
 return {weighted,st,final,margin,speedBasis:weighted*final};
}
function aigcFinalPrice(condition){return n(condition.cost)*n(condition.profit)*n(data.fx)*n(data.pointsPerYuan);}
function aigcEquivalentYuan(condition){return n(condition.cost)*n(condition.profit)*n(data.fx);}
function agentFinalPrice(step){return n(step.cost)*n(step.profit)*n(data.fx)*n(data.pointsPerYuan);}
function agentEquivalentYuan(step){return n(step.cost)*n(step.profit)*n(data.fx);}
function renderModels(){
 const values=data.models.map(modelCalc),minSpeed=Math.min(...values.map(value=>value.speedBasis).filter(value=>value>0),Infinity);
 $('#modelRows').innerHTML=data.models.map((model,index)=>{
   const result=values[index],normal=minSpeed<Infinity&&result.speedBasis>0?result.speedBasis/minSpeed:0;
   const cell=(key,value,opts={})=>`<input class="${opts.class||''}" ${opts.type==='text'?'type="text"':'type="number" min="0" step="any"'} data-model-key="${key}" value="${safe(value)}" aria-label="${opts.label||key}">`;
 const firstOfSeries=index===0||data.models[index-1].series!==model.series;
 const seriesCount=firstOfSeries?data.models.slice(index).findIndex(row=>row.series!==model.series):0;
 const rowspan=firstOfSeries?(seriesCount<0?data.models.length-index:seriesCount):0;
   return `<tr data-id="${model.id}">${firstOfSeries?`<td rowspan="${rowspan}" class="series-cell">${cell('series',model.series,{type:'text'})}</td>`:''}<td class="model-name-cell">${cell('name',model.name,{type:'text',class:'model-name',label:'模型名称'})}</td><td>${cell('quote',model.quote,{type:'text',class:'quote-input',label:'采购报价'})}</td><td>${cell('input',model.input,{label:'官方输入价'})}</td><td>${cell('output',model.output,{label:'官方输出价'})}</td><td>${cell('cache',model.cache,{label:'缓存读价'})}</td><td>${cell('procurement',model.procurement,{label:'中位供应成本倍率'})}</td><td>${cell('token',model.token,{label:'Token 倍率'})}</td><td><span class="model-result">${result.final.toFixed(3)}</span></td><td><span class="margin-positive">${pct(result.margin)}</span></td><td><span class="speed-pill ${Math.abs(normal-1)<.001?'baseline':''}">${normal.toFixed(2)}×</span></td><td><button class="row-delete" data-delete="model" data-id="${model.id}">×</button></td></tr>`;
 }).join('');
 $('#modelRows').oninput=event=>{const input=event.target.closest('[data-model-key]');if(!input)return;const index=data.models.findIndex(item=>item.id===input.closest('[data-id]').dataset.id),row=data.models[index];if(!row)return;const value=input.type==='number'?n(input.value):input.value;if(input.dataset.modelKey==='series'){const old=row.series;let start=index,end=index;while(start>0&&data.models[start-1].series===old)start--;while(end+1<data.models.length&&data.models[end+1].series===old)end++;for(let i=start;i<=end;i++)data.models[i].series=value;}else row[input.dataset.modelKey]=value;persist();};
 $('#modelRows').onchange=event=>{if(event.target.closest('[data-model-key]'))renderModels();};
}
function renderAigc(){
 const active=data.activeModule;
 $$('#moduleTabs [data-module]').forEach(tab=>tab.classList.toggle('active',tab.dataset.module===active));
 const models=data.aigc.filter(model=>model.module===active);
 $('#aigcGrid').innerHTML=models.length?models.map(model=>{
   model.conditions ||= [{id:uid('condition'),spec:model.spec||'请填写输出规格',cost:model.cost??.1,profit:1,marketPrice:''}];
   const selected=model.conditions.find(condition=>condition.id===model.activeConditionId)||model.conditions[0];
   model.activeConditionId=selected?.id||'';
   const tabs=model.conditions.map(condition=>`<button class="condition-tab ${condition.id===selected?.id?'active':''}" role="tab" aria-selected="${condition.id===selected?.id}" data-select-condition="${condition.id}">${safe(condition.spec||'未命名规格')}</button>`).join('');
   const panel=selected?(()=>{
     const price=aigcFinalPrice(selected),margin=grossMargin(selected.profit);
     return `<div class="condition-panel" role="tabpanel" data-condition-id="${selected.id}"><div class="condition-spec"><label>输出条件</label><input data-condition-key="spec" value="${safe(selected.spec)}" aria-label="输出条件">${miniField('市场价（元）','marketPrice',selected.marketPrice,{prefix:'¥',type:'text'})}<button class="row-delete" data-delete-condition="${selected.id}" data-model="${model.id}" title="删除条件">×</button></div><div class="condition-fields">${miniField('模型成本（元）','cost',selected.cost,{prefix:'¥'})}${miniField('盈利倍数','profit',selected.profit??1,{suffix:'×'})}<div class="condition-final"><span>最终售价</span><strong>${points(price)}</strong><small>${money(aigcEquivalentYuan(selected),3)} 等值金额</small></div><div class="condition-margin"><span>毛利率</span><strong>${pct(margin)}</strong></div></div>${selected.priceNote?`<div class="price-note">${safe(selected.priceNote)}</div>`:''}</div>`;
   })():`<div class="empty-state condition-empty">暂无输出条件，请添加一条。</div>`;
   return `<article class="aigc-card" data-id="${model.id}"><div class="aigc-card-head"><div><div class="model-title"><input data-model-name value="${safe(model.name)}" aria-label="模型名称"></div></div><button class="row-delete" data-delete="aigc" data-id="${model.id}">×</button></div><div class="condition-tabs" role="tablist" aria-label="输出规格">${tabs}<button class="text-button condition-add" data-add-condition="${model.id}">＋ 添加输出条件</button></div>${panel}<div class="aigc-card-footer"><span>售价 = 成本 × 盈利倍数 × 积分汇率 × 积分 / 元</span></div></article>`;
 }).join(''):`<div class="empty-state">${MODULES[active]}模块暂无模型，点击「添加模型」开始配置。</div>`;
 bindAigc();
}
function bindAigc(){
 $$('#aigcGrid [data-model-name]').forEach(input=>input.addEventListener('input',()=>{const model=data.aigc.find(row=>row.id===input.closest('[data-id]').dataset.id);if(model){model.name=input.value;persist();}}));
 $$('#aigcGrid [data-condition-key]').forEach(input=>input.addEventListener('input',()=>{const card=input.closest('.aigc-card'),model=data.aigc.find(row=>row.id===card.dataset.id),condition=model?.conditions.find(row=>row.id===input.closest('[data-condition-id]').dataset.conditionId);if(condition){condition[input.dataset.conditionKey]=input.value;if(input.dataset.conditionKey==='spec'){const tab=$(`[data-select-condition="${condition.id}"]`,card);if(tab)tab.textContent=input.value||'未命名规格';}persist();}}));
 $$('#aigcGrid [data-key]').forEach(input=>input.addEventListener('input',()=>{const card=input.closest('.aigc-card'),model=data.aigc.find(row=>row.id===card.dataset.id),condition=model?.conditions.find(row=>row.id===input.closest('[data-condition-id]').dataset.conditionId);if(condition){condition[input.dataset.key]=input.dataset.key==='marketPrice'?input.value:n(input.value);persist();}}));
 $$('#aigcGrid input').forEach(input=>input.addEventListener('change',()=>renderAigc()));
}
function renderAgents(){
 $('#agentList').innerHTML=data.agents.length?data.agents.map(agent=>{
   const avg=agent.steps.length?agent.steps.reduce((sum,step)=>sum+grossMargin(step.profit),0)/agent.steps.length:0;
   const baseCost=agent.steps.reduce((sum,step)=>sum+n(step.cost),0);
   return `<article class="agent-card" data-id="${agent.id}"><header class="agent-card-head"><div class="agent-name-wrap"><span class="agent-glyph">⬡</span><input class="agent-name" data-agent-name value="${safe(agent.name)}" aria-label="智能体名称"><span class="agent-head-meta">${agent.steps.length} 个工作环节</span></div><div class="agent-head-right"><span class="agent-margin-total">环节平均毛利 <b>${pct(avg)}</b></span><button class="row-delete" data-delete="agent" data-id="${agent.id}">×</button></div></header><div class="agent-steps">${agent.steps.map(step=>{
     const price=agentFinalPrice(step);
     return `<div class="agent-step" data-step-id="${step.id}"><input class="step-name" data-step-key="name" value="${safe(step.name)}" aria-label="环节名称"><div class="step-field"><label>成本上限 / 计费单位</label><input data-step-key="limit" value="${safe(step.limit)}" aria-label="成本上限"></div><div class="step-field"><label>成本（元）</label><input type="number" min="0" step=".01" data-step-key="cost" value="${safe(step.cost)}"></div><div class="step-field"><label>盈利倍数</label><input type="number" min="0" step=".1" data-step-key="profit" value="${safe(step.profit)}"></div><div class="step-field"><label>最终售价 / ${safe(step.unit||'次')}</label><div class="step-output">${points(price)}<small>${money(agentEquivalentYuan(step),3)} · ${pct(grossMargin(step.profit))}</small></div></div><button class="row-delete" data-delete="step" data-agent="${agent.id}" data-id="${step.id}">×</button></div>`;
   }).join('')}</div><footer class="agent-footer"><button class="text-button" data-add-step="${agent.id}">＋ 添加工作环节</button><span class="agent-total-cost">所有环节基准成本 <b>${money(baseCost,3)}</b></span></footer></article>`;
 }).join(''):'<div class="empty-state">还没有智能体，点击「新增智能体」开始拆分。</div>';
 bindAgents();
}
function bindAgents(){
 $$('#agentList [data-agent-name]').forEach(input=>input.addEventListener('input',()=>{const agent=data.agents.find(row=>row.id===input.closest('[data-id]').dataset.id);if(agent){agent.name=input.value;persist();}}));
 $$('#agentList [data-step-key]').forEach(input=>input.addEventListener('input',()=>{const agent=data.agents.find(row=>row.id===input.closest('.agent-card').dataset.id),step=agent?.steps.find(row=>row.id===input.closest('[data-step-id]').dataset.stepId);if(step){step[input.dataset.stepKey]=input.type==='number'?n(input.value):input.value;persist();}}));
 $$('#agentList [data-step-key]').forEach(input=>input.addEventListener('change',()=>renderAgents()));
}
function render(){
 renderSummary();renderPlans();renderModels();renderAigc();renderAgents();
}
function xmlEscape(value){return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[char]));}
function excelColumn(index){let name='';for(index++;index;index=Math.floor((index-1)/26))name=String.fromCharCode(65+(index-1)%26)+name;return name;}
function buildPricingWorkbook(){
 const rows=[],merges=[];
 const sections=[
  {title:'全局参数',headers:['参数名称','当前值','单位','用途'],records:[
   ['积分汇率',n(data.fx),'倍','用于模型倍率、AIGC 与智能体价格换算'],
   ['1 元兑换多少积分',n(data.pointsPerYuan),'积分/元','将人民币报价换算为页面展示的积分售价']
  ],styles:[0,6,0,0]},
  {title:'订阅方案',headers:['方案名称','订阅周期','原价或月付×12基准价','折扣率','最终售价','基础积分','赠送积分','到账积分','用户权益'],records:data.plans.flatMap(plan=>['month','year'].map(period=>{
   const annual=period==='year',pricing=planPeriodPricing(plan,annual),periods=pricing.periods;
   const basePoints=n(plan.basePoints)*periods,giftPoints=n(plan.basePoints)*n(plan.giftRate)/100*periods;
   return [plan.name,annual?'年付':'月付',pricing.basePrice,pricing.discount/100,pricing.finalPrice,basePoints,giftPoints,basePoints+giftPoints,(Array.isArray(plan.features)?plan.features:[]).join('；')];
  })),styles:[0,0,3,4,3,5,5,5,0]},
  {title:'加量包方案',headers:['加量包名称','充值积分','赠送积分','到账积分','最终售价','预计用户获得的积分总额'],records:data.topups.map(pack=>{
   const gift=n(pack.points)*n(pack.giftRate)/100,credited=Math.round(n(pack.points)*(1+n(pack.giftRate)/100));
   return [pack.name,n(pack.points),gift,credited,n(pack.price),credited];
  }),styles:[0,5,5,5,3,5]},
  {title:'模型倍率',headers:['模型系列','模型名称','Token 倍率','当前最终倍率'],records:data.models.map(model=>[model.series,model.name,n(model.token),modelCalc(model).final]),styles:[0,0,6,6]},
  {title:'AIGC',headers:['类别','模型名称','输出规格','计费单位','最终售价（积分）','等值人民币','市场价（元）'],records:data.aigc.flatMap(model=>(model.conditions||[]).map(condition=>{
   const units={image:'次',video:'条',music:'首',text:'次'},market=String(condition.marketPrice??'').trim();
   const marketNumber=market!==''&&Number.isFinite(Number(market))?Number(market):market;
   return [MODULES[model.module]||model.module||'',model.name,condition.spec,units[model.module]||'次',Math.round(aigcFinalPrice(condition)),aigcEquivalentYuan(condition),marketNumber];
  })),styles:[0,0,0,0,5,3,3]},
  {title:'智能体',headers:['智能体名称','工作环节','计费单位','最终售价（积分）','等值人民币'],records:data.agents.flatMap(agent=>(agent.steps||[]).map(step=>[agent.name,step.name,step.unit||'次',Math.round(agentFinalPrice(step)),agentEquivalentYuan(step)])),styles:[0,0,0,5,3]}
 ];
 for(const section of sections){
  const width=section.headers.length,titleRow=rows.length+1;
  rows.push({title:section.title,width});merges.push(`A${titleRow}:${excelColumn(width-1)}${titleRow}`);
  rows.push({cells:section.headers.map(value=>({value,style:2}))});
  for(const record of section.records)rows.push({cells:record.map((value,index)=>({value,style:section.styles[index]||0}))});
  rows.push({cells:[]});
 }
 if(rows.at(-1)?.cells?.length===0)rows.pop();
 const maxRow=rows.length,maxCol=9;
 const xmlRows=rows.map((row,rowIndex)=>{
  const rowNum=rowIndex+1;
  if(row.title)return `<row r="${rowNum}" ht="25" customHeight="1"><c r="A${rowNum}" s="1" t="inlineStr"><is><t>${xmlEscape(row.title)}</t></is></c></row>`;
  const cells=(row.cells||[]).map((cell,colIndex)=>{
   if(cell.value===null||cell.value===undefined||cell.value==='')return '';
   const ref=`${excelColumn(colIndex)}${rowNum}`,style=cell.style?` s="${cell.style}"`:'';
   if(typeof cell.value==='number'&&Number.isFinite(cell.value))return `<c r="${ref}"${style}><v>${cell.value}</v></c>`;
   return `<c r="${ref}"${style} t="inlineStr"><is><t xml:space="preserve">${xmlEscape(cell.value)}</t></is></c>`;
  }).join('');
  return `<row r="${rowNum}">${cells}</row>`;
 }).join('');
 const colWidths=[22,24,25,18,19,19,19,19,54];
 const columns=colWidths.map((width,index)=>`<col min="${index+1}" max="${index+1}" width="${width}" customWidth="1"/>`).join('');
 const worksheet=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheetPr><pageSetUpPr fitToPage="1"/></sheetPr><dimension ref="A1:${excelColumn(maxCol-1)}${maxRow}"/><sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews><cols>${columns}</cols><sheetData>${xmlRows}</sheetData><mergeCells count="${merges.length}">${merges.map(ref=>`<mergeCell ref="${ref}"/>`).join('')}</mergeCells><printOptions horizontalCentered="1"/><pageMargins left="0.25" right="0.25" top="0.5" bottom="0.5" header="0.2" footer="0.2"/><pageSetup paperSize="9" orientation="landscape" fitToWidth="1" fitToHeight="0"/></worksheet>`;
 const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="3"><numFmt numFmtId="164" formatCode="&quot;¥&quot;#,##0.00"/><numFmt numFmtId="165" formatCode="0.0%"/><numFmt numFmtId="166" formatCode="#,##0.## &quot;积分&quot;"/></numFmts><fonts count="3"><font><sz val="10"/><name val="Microsoft YaHei"/></font><font><b/><color rgb="FFFFFFFF"/><sz val="12"/><name val="Microsoft YaHei"/></font><font><b/><color rgb="FF26324B"/><name val="Microsoft YaHei"/></font></fonts><fills count="4"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FF4058D6"/><bgColor indexed="64"/></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFEAF0FF"/><bgColor indexed="64"/></patternFill></fill></fills><borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFDCE2EF"/></left><right style="thin"><color rgb="FFDCE2EF"/></right><top style="thin"><color rgb="FFDCE2EF"/></top><bottom style="thin"><color rgb="FFDCE2EF"/></bottom><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="7"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/><xf numFmtId="166" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
 const workbook=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="定价预演" sheetId="1" r:id="rId1"/></sheets><definedNames><definedName name="_xlnm.Print_Area" localSheetId="0">'定价预演'!$A$1:$I$${maxRow}</definedName></definedNames><calcPr calcId="191029"/></workbook>`;
 const files=[
  ['[Content_Types].xml','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>'],
  ['_rels/.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
  ['xl/workbook.xml',workbook],
  ['xl/_rels/workbook.xml.rels','<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
  ['xl/styles.xml',styles],['xl/worksheets/sheet1.xml',worksheet]
 ];
 return makeStoredZip(files);
}
function makeStoredZip(files){
 const encoder=new TextEncoder(),output=[],central=[],crcTable=Array.from({length:256},(_,index)=>{let crc=index;for(let bit=0;bit<8;bit++)crc=crc&1?0xedb88320^(crc>>>1):crc>>>1;return crc>>>0;});
 const crc32=bytes=>{let crc=0xffffffff;for(const byte of bytes)crc=crcTable[(crc^byte)&255]^(crc>>>8);return (crc^0xffffffff)>>>0;};
 const put16=(target,value)=>{target.push(value&255,(value>>>8)&255);},put32=(target,value)=>{target.push(value&255,(value>>>8)&255,(value>>>16)&255,(value>>>24)&255);};
 let offset=0;
 for(const [name,content] of files){
  const filename=encoder.encode(name),bytes=encoder.encode(content),crc=crc32(bytes),local=[];
  put32(local,0x04034b50);put16(local,20);put16(local,0);put16(local,0);put16(local,0);put16(local,0);put32(local,crc);put32(local,bytes.length);put32(local,bytes.length);put16(local,filename.length);put16(local,0);
  output.push(new Uint8Array([...local,...filename, ...bytes]));
  const entry=[];put32(entry,0x02014b50);put16(entry,20);put16(entry,20);put16(entry,0);put16(entry,0);put16(entry,0);put16(entry,0);put32(entry,crc);put32(entry,bytes.length);put32(entry,bytes.length);put16(entry,filename.length);put16(entry,0);put16(entry,0);put16(entry,0);put16(entry,0);put32(entry,0);put32(entry,offset);
  central.push(new Uint8Array([...entry,...filename]));offset+=local.length+filename.length+bytes.length;
 }
 const centralSize=central.reduce((sum,entry)=>sum+entry.length,0),end=[];put32(end,0x06054b50);put16(end,0);put16(end,0);put16(end,files.length);put16(end,files.length);put32(end,centralSize);put32(end,offset);put16(end,0);
 return new Blob([...output,...central,new Uint8Array(end)],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
}
function exportPricingExcel(){
 const blob=buildPricingWorkbook(),url=URL.createObjectURL(blob),link=document.createElement('a');
 link.href=url;link.download=`定价预演-${new Date().toISOString().slice(0,10)}.xlsx`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('定价预演 Excel 已导出');
}
function addRecord(type){
 if(type==='plan')data.plans.push({id:uid('plan'),name:'新订阅方案',desc:'填写方案说明。',price:128,listPrice:1280,monthDiscount:0,annualDiscount:20,basePoints:3000,giftRate:20,features:['全部模型可选']});
 if(type==='topup')data.topups.push({id:uid('topup'),name:'新加量包',points:5000,giftRate:0,price:50,discount:0});
 if(type==='model')data.models.push({id:uid('model'),series:'其他',name:'新模型',quote:'1',procurement:1,token:2,baseSt:2,input:1,output:4,cache:.2,baseMargin:.5,sourceSpeed:.1});
 if(type==='aigc')data.aigc.push({id:uid('aigc'),module:data.activeModule,name:'新 AIGC 模型',conditions:[{id:uid('condition'),spec:'请填写输出规格',cost:.1,profit:1,marketPrice:''}]});
 if(type==='agent')data.agents.push({id:uid('agent'),name:'新智能体',steps:[{id:uid('step'),name:'新工作环节',limit:'填写成本上限',cost:.1,profit:2,unit:'次'}]});
 changed('记录已添加');
}
function removeRecord(type,id,parent){
 if(type==='plan')data.plans=data.plans.filter(row=>row.id!==id);
 if(type==='topup')data.topups=data.topups.filter(row=>row.id!==id);
 if(type==='model')data.models=data.models.filter(row=>row.id!==id);
 if(type==='aigc')data.aigc=data.aigc.filter(row=>row.id!==id);
 if(type==='agent')data.agents=data.agents.filter(row=>row.id!==id);
 if(type==='step'){const agent=data.agents.find(row=>row.id===parent);if(agent)agent.steps=agent.steps.filter(row=>row.id!==id);}
 changed('记录已删除');
}
document.addEventListener('click',event=>{
 const add=event.target.closest('[data-add]');if(add){addRecord(add.dataset.add);return;}
 const del=event.target.closest('[data-delete]');if(del){removeRecord(del.dataset.delete,del.dataset.id,del.dataset.agent);return;}
 const delCondition=event.target.closest('[data-delete-condition]');if(delCondition){const model=data.aigc.find(row=>row.id===delCondition.dataset.model);if(model){model.conditions=model.conditions.filter(row=>row.id!==delCondition.dataset.deleteCondition);if(model.activeConditionId===delCondition.dataset.deleteCondition)model.activeConditionId=model.conditions[0]?.id||'';}changed('输出条件已删除');return;}
 const selectCondition=event.target.closest('[data-select-condition]');if(selectCondition){const model=data.aigc.find(row=>row.id===selectCondition.closest('.aigc-card').dataset.id);if(model){model.activeConditionId=selectCondition.dataset.selectCondition;persist();renderAigc();}return;}
 const addCondition=event.target.closest('[data-add-condition]');if(addCondition){const model=data.aigc.find(row=>row.id===addCondition.dataset.addCondition);if(model){const condition={id:uid('condition'),spec:'新输出条件',cost:.1,profit:1,marketPrice:''};model.conditions.push(condition);model.activeConditionId=condition.id;}changed('输出条件已添加');return;}
 const addFeature=event.target.closest('[data-add-feature]');if(addFeature){const plan=data.plans.find(row=>row.id===addFeature.dataset.addFeature);if(plan)plan.features.push('新权益');changed('订阅权益已添加');return;}
 const delFeature=event.target.closest('[data-delete-feature]');if(delFeature){const plan=data.plans.find(row=>row.id===delFeature.dataset.id);if(plan)plan.features.splice(Number(delFeature.dataset.deleteFeature),1);changed('订阅权益已删除');return;}
 const billing=event.target.closest('[data-billing]');if(billing){data.billing=billing.dataset.billing;changed();return;}
 const module=event.target.closest('[data-module]');if(module){data.activeModule=module.dataset.module;persist();renderAigc();return;}
 const addStep=event.target.closest('[data-add-step]');if(addStep){const agent=data.agents.find(row=>row.id===addStep.dataset.addStep);if(agent)agent.steps.push({id:uid('step'),name:'新工作环节',limit:'填写成本上限',cost:.1,profit:2,unit:'次'});changed('工作环节已添加');return;}
 if(event.target.closest('#resetBtn')){data=structuredClone(seed);persist();render();toast('已恢复截图导入的模型与初始方案');return;}
 if(event.target.closest('#exportBtn')){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=`northstar-pricing-${new Date().toISOString().slice(0,10)}.json`;link.click();URL.revokeObjectURL(link.href);toast('方案 JSON 已导出');}
 if(event.target.closest('#exportExcelBtn')){exportPricingExcel();}
});
$('#pointFx').addEventListener('input',event=>{data.fx=Math.max(.01,n(event.target.value));$('#summaryFx').textContent=data.fx.toFixed(2);persist();});
$('#pointFx').addEventListener('change',()=>render());
$('#pointsPerYuan').addEventListener('input',event=>{data.pointsPerYuan=Math.max(.01,n(event.target.value));$('#summaryPointsPerYuan').textContent=data.pointsPerYuan.toLocaleString('zh-CN');persist();});
$('#pointsPerYuan').addEventListener('change',()=>render());
$$('.nav-link').forEach(link=>link.addEventListener('click',()=>{$$('.nav-link').forEach(item=>item.classList.toggle('active',item===link));}));
render();
