/* ===========================================================
   Reframe · 可点击原型 —— 交互逻辑
   单文件依赖：无外部网络请求
   =========================================================== */

/* ---------- 屏幕清单 ---------- */
const MAIN = ['enter','import','brief','platforms','processing','output','refine','fix','export','rules','review'];
const FAIL_PATH = ['platforms','processing','fail','degraded','output'];

const SCREENS = [
  { id:'enter',      n:'01', label:'封面 / 进入' },
  { id:'import',     n:'02', label:'导入源视频' },
  { id:'brief',      n:'03', label:'素材体检' },
  { id:'platforms',  n:'04', label:'选平台' },
  { id:'processing', n:'05', label:'改写中' },
  { id:'fail',       n:'06', label:'失败分支' },
  { id:'degraded',   n:'07', label:'降级出片' },
  { id:'output',     n:'08', label:'四版结果' },
  { id:'refine',     n:'09', label:'单版微调' },
  { id:'fix',        n:'10', label:'结果不理想' },
  { id:'export',     n:'11', label:'导出排期' },
  { id:'rules',      n:'12', label:'规则沉淀' },
  { id:'review',     n:'13', label:'数据回流' }
];

/* ---------- 讲解栏内容 ---------- */
const RAIL = {
  enter: {
    t:'进入：名字和功能同一眼对得上',
    tags:['演示点 ① 进入产品'],
    ul:[
      '打开就直接落在承诺上：<b>一条视频 → 四个货架</b>，没有注册墙、没有空状态教程。',
      '首屏四块彩色卡片就是四个平台的成片版本，<b>把输出结果直接当封面用</b>。',
      '底部「最近」是给回访用户的入口 —— 日更类产品的首页必须是续上一次的地方。'
    ],
    note:'Reframe 不生产画面，只做“同一份内容资产在不同语境里的再版”。所以封面不能写成「AI 帮你生成视频」——写成那样，第一眼就把人引错了。'
  },
  import: {
    t:'开始操作：从用户已经拥有的东西出发',
    tags:['演示点 ② 开始操作'],
    ul:[
      '起点是<b>相册里的一段随手拍</b>，不是空白画布。也支持粘贴已发布链接。',
      '默认帮她选中最近那一条 —— 少一次点击，因为这一步没有任何决策价值。',
      '左上「1 / 4」告诉她这次要做几步，避免未知长度的流程让人中途退出。'
    ],
    note:'不提供「从零开始创作」入口。这个产品的前提是用户已经拍了东西，只是没发出来；让她先拍，等于把最难的一步甩给用户。'
  },
  brief: {
    t:'素材体检：先把不能发的地方点出来',
    tags:['演示点 ② 开始操作','建立信任'],
    ul:[
      'AI 先报一遍它读到了什么：品类、卖点、现有开头、字幕位置、音乐。',
      '再列出<b>必须重做的 3 处</b>，每一处都给具体位置和原因。',
      '这一步不修改任何东西 —— 让用户先判断 AI 说得对不对，再谈改写。'
    ],
    note:'这一步是防止「归因错位」的关键。后面万一成片不好，用户会记得：AI 早就说过原片前 3 秒没钩子 —— 锅不会全扣在 AI 头上。'
  },
  platforms: {
    t:'选择目标：每家货架的规矩不一样',
    tags:['演示点 ③ 核心流程'],
    ul:[
      '四个平台各自摊开规则：时长、前 3 秒、字幕安全区、音乐版权。',
      '每张卡右上角写清<b>待改 N 处</b>，让用户预期在动手之前就被管理。',
      '默认全选 —— 她的真实目标是铺满渠道，不是挑一个。'
    ],
    note:'这是整个产品唯一有资产价值的地方：规则会沉淀成「我的货架手册」。所以这里必须把规则摆出来，而不是藏在一个「智能优化」按钮后面。'
  },
  processing: {
    t:'加载态：让用户看得见机器在干什么',
    tags:['演示点 ⑤ 加载 / 等待'],
    ul:[
      '四个阶段实时推进，配上真实日志，而不是一个转圈。',
      '日志里出现的是<b>具体动作</b>（抽出 6 个片段、音乐比对命中缺失）。',
      '提示可以关掉 App —— 异步任务的等待不该占用她的注意力。'
    ],
    note:'等待时长不可控，所以等待必须是「有内容的等待」。用户看到 AI 在做什么，才能判断这条片子值不值得继续等。'
  },
  output: {
    t:'输出结果：同一素材，四版各有各的样子',
    tags:['演示点 ④ 输出结果'],
    ul:[
      '四个版本并排，每张封面上的<b>钩子、字幕位置、音乐、封面</b>都不一样。',
      '顶部四个数字先把结果量级说清：4 版 / 16 处差异 / 9 项合规 / 1 处待确认。',
      '右下角提示每版都能点开看「为什么这样改」，从结果通向规则。'
    ],
    note:'交付的是「可以直接发的东西」，不是「可以再编辑的工程」。小卖家没有精剪预算，第一版就要能发出去。'
  },
  refine: {
    t:'微调：让用户改得起，而不是重跑一遍',
    tags:['演示点 ③ 核心流程','可编辑'],
    ul:[
      '钩子给 3 个候选，每个标注<b>预计 3 秒完播的提升幅度</b>，选择有依据。',
      '字幕 / 封面 / 音乐分 Tab，改一项只重合成这一项。',
      '「这一版为什么这样改」直接把规则摊开看，附来源和置信度。'
    ],
    note:'AI 的产出必须留出被人改的位置。提供候选而不是唯一答案，是把「AI 说了算」变成「我说了算」的最小改动。'
  },
  fail: {
    t:'失败：归因到具体步骤，并给出路',
    tags:['演示点 ⑤ 失败处理'],
    ul:[
      '明确写清<b>第 2 步失败、原因是上游超时、不是素材问题</b>。',
      '已完成的部分（解析出 6 个片段）不会浪费，改写次数一次没扣。',
      '三条出路：本地模板先出片 / 留在队列里重试 / 跳过 AI 自己写。'
    ],
    note:'失败界面最忌讳「出错了，请重试」。用户需要知道：这是谁的锅、我损失了什么、我现在能做什么 —— 三件事缺一件，她就会关掉 App。'
  },
  degraded: {
    t:'降级：先给用户一条能发的，不是一条空白',
    tags:['演示点 ⑤ 失败兜底'],
    ul:[
      '横幅直说是「快速版」：钩子来自规则库句式，不是现场生成。',
      '版式、字幕、音乐这些<b>规则确定的部分照常做完</b>，只降级文案。',
      '底部显示 AI 精剪仍在排队，好了会覆盖 —— 保住期待，不用她盯着。'
    ],
    note:'降级一定要「降级可见」。把模板句伪装成 AI 生成，用户一旦在四个平台刷到同一句话，信任就一次性归零。'
  },
  fix: {
    t:'结果不理想：把抱怨变成一条永久规则',
    tags:['演示点 ⑤ 结果不理想'],
    ul:[
      '她点「字幕被压住」，画面立刻用<b>安全区虚线</b>把冲突位置框出来。',
      '给三个修正方案（推荐 / 备选 / 激进），而不是一句「已重新生成」。',
      '应用后这条规则写进手册，<b>下次 Shorts 默认上移 6%</b>。'
    ],
    note:'结果不理想是所有 AI 产品真正的分水岭。这里的处理原则：不猜、不重跑、让用户指认问题 —— 一次指认等于一条带标签的训练数据。'
  },
  export: {
    t:'完成后还能做什么：发布节奏也是产品的一部分',
    tags:['演示点 ⑥ 后续动作'],
    ul:[
      '按她过去 30 天的数据给出每个平台的<b>建议发布时间</b>，并可直接排期。',
      '顺手导出 SRT 字幕和封面 JPG —— 这些东西她发别的渠道也用得上。',
      '审阅链接给合伙人，不用对方装 App —— B 端协作的最低成本入口。'
    ],
    note:'她的目标是「四个货架都有货」，不是导出四个文件。所以最后一步必须落在“什么时候发”。'
  },
  rules: {
    t:'沉淀：唯一会随着使用变强的东西',
    tags:['演示点 ⑥ 积累复用'],
    ul:[
      '这次学到的规则入库，标注<b>来源与置信度</b>（用户反馈 / 平台文档 / 历史数据）。',
      '每条都能单独开关，用户可以不同意，也可以整个关掉。',
      '手册可导出给团队 —— 从个人工具变成小团队的作业标准。'
    ],
    note:'「这次为什么这样改」如果只是一次性解释，产品就没有壁垒。规则能被看见、被修改、被复用，才是用户换不掉的理由。'
  },
  review: {
    t:'回流：赢的那一版做对了什么',
    tags:['演示点 ⑥ 数据闭环'],
    ul:[
      '48 小时后四个平台的 3 秒完播并排对比，差距一眼可见。',
      '把胜出的钩子<b>一键设为葡语默认句式</b>，下次直接复用。',
      '结尾指向每周固定的「一次拍摄 → 四平台发布」节奏。'
    ],
    note:'不做一个大而全的数据看板。她只看一件事：哪个钩子、哪个平台在给我赚钱 —— 其余指标都是噪音。'
  }
};

/* ---------- 运行状态 ---------- */
let cur = 'enter';
let failMode = false;
const timers = [];
let autoTimer = null, autoOn = false, autoIdx = 0;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

/* ---------- 屏幕路由 ---------- */
function go(id, silent){
  if(!SCREENS.some(s=>s.id===id)) return;
  stopProc();
  cur = id;

  $$('.scr').forEach(el=>el.classList.toggle('is-on', el.id === 'scr-'+id));
  const sc = $('#scr-'+id+' .sc'); if(sc) sc.scrollTop = 0;

  $$('.c-chip').forEach(c=>c.classList.toggle('act', c.dataset.go===id));
  rail(id); stepsUI(id); enterFX(id);

  if(!silent){ location.hash = id; }
}

function stepsUI(id){
  const order = SCREENS.map(s=>s.id);
  const idx = order.indexOf(id);
  $$('.rs-btn').forEach(b=>{
    const i = order.indexOf(b.dataset.go);
    b.classList.toggle('act', b.dataset.go===id);
    b.classList.toggle('done', i < idx);
  });
}

function rail(id){
  const r = RAIL[id]; if(!r) return;
  $('#railTitle').textContent = r.t;
  $('#railNote').innerHTML = r.note;
  $('#railUl').innerHTML = r.ul.map(x=>`<li>${x}</li>`).join('');
  $('#railTags').innerHTML = r.tags.map((t,i)=>`<span class="tg${i?' alt':''}">${t}</span>`).join('');
}

/* ---------- 每屏进入时的动效 ---------- */
function enterFX(id){
  if(id==='output'){ countUp(); }
  if(id==='review'){ restartBars(); }
  if(id==='processing'){ startProc(); }
  if(id==='refine'){ resetRefine(); }
  if(id==='fix'){ resetFix(); }
}

function countUp(){
  $$('#scr-output .kpi-n').forEach((el,i)=>{
    const target = +el.dataset.count;
    if(reduce || document.body.classList.contains('shot') || document.body.classList.contains('frozen')){ el.textContent = target; return; }
    const t0 = performance.now() + i*70, dur = 620;
    function tick(t){
      const p = Math.min(1, Math.max(0, (t - t0)/dur));
      const e = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(target*e);
      if(p<1) requestAnimationFrame(tick);
    }
    el.textContent = '0';
    requestAnimationFrame(tick);
  });
}

function restartBars(){
  $$('#scr-review .br-t i').forEach(el=>{
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = '';
  });
}

/* ---------- 处理中 / 失败模拟 ---------- */
const SCHED = [
  {t:0,    stage:'解析源片',        sub:'先把抽出来的人和货对上'},
  {t:1500, stage:'生成钩子文案',    sub:'四个平台各写 3 条候选'},
  {t:3400, stage:'重排版式与字幕',  sub:'避开各家 UI 的安全区'},
  {t:4800, stage:'合规音乐与封面',  sub:'替换无授权曲目'},
  {t:5800, done:true}
];
const LOGS = [
  {t:250,  s:'载入 IMG_4821.mp4 · 38s · 1080×1920'},
  {t:1200, s:'抽出 6 个可用片段 · 合计 21s'},
  {t:1900, s:'正在为 4 个平台各写 3 条钩子…'},
  {t:2900, s:'TikTok 选中提问式钩子（预计 3s 留存 +12%）'},
  {t:3700, s:'字幕重排：TikTok 中置 · Shorts 上移 6%'},
  {t:4500, s:'音乐比对：Reels 曲库缺失 → 已换商用 phonk'},
  {t:5300, s:'封面生成完成 · 4 张'}
];

function clearTimers(){ timers.forEach(clearTimeout); timers.length = 0; }
function stopProc(){ clearTimers(); }

function resetProcUI(){
  $('#procPct').innerHTML = '0<i>%</i>';
  $('#procStage').textContent = '解析源片';
  $('#procSub').textContent = '这步在读的人和货要对得上';
  $('#procLog').innerHTML = '<div class="log-l"><i class="ldot"></i>已识别 12 个有效口播片段</div>';
  const st = $$('#scr-processing .st');
  st.forEach((s,i)=>{
    s.classList.remove('done','act','err');
    if(i===0) s.classList.add('done');
    if(i===1) s.classList.add('act');
    const x = s.querySelector('.st-x');
    if(x) x.textContent = ['1.2s','…','待','待'][i];
  });
  $('#st2').classList.add('act');
  $('.wr-fg').style.strokeDashoffset = 327;
}

function procStatic(){
  const ring = $('#scr-processing .wr-fg');
  if(ring) ring.style.strokeDashoffset = 118;
  $('#procPct').innerHTML = '64<i>%</i>';
  $('#procStage').textContent = '重排版式与字幕';
  $('#procSub').textContent = '避开各家 UI 的安全区';
  $('#procLog').innerHTML = [
    '已识别 12 个有效口播片段',
    '载入 IMG_4821.mp4 · 38s · 1080×1920',
    '抽出 6 个可用片段 · 合计 21s',
    'TikTok 选中提问式钩子（预计 3s 留存 +12%）'
  ].map(s=>`<div class="log-l"><i class="ldot"></i>${s}</div>`).join('');
  const st = $$('#scr-processing .st');
  const xs = ['1.2s','3.1s','…','待'];
  st.forEach((s,i)=>{
    s.classList.remove('done','act','err');
    if(i<2) s.classList.add('done');
    if(i===2) s.classList.add('act');
    const x = s.querySelector('.st-x'); if(x) x.textContent = xs[i];
  });
}

function startProc(){
  resetProcUI();
  if(document.body.classList.contains('shot')){ procStatic(); return; }
  const end = failMode ? 2600 : 5800;

  // 进度环 + 阶段文案
  const t0 = performance.now();
  function tick(now){
    const el = now - t0;
    const p = Math.min(1, el/end);
    const ring = $('#scr-processing .wr-fg');
    if(ring) ring.style.strokeDashoffset = 327 * (1 - (failMode ? Math.min(p, .46) : p));
    const pctEl = $('#procPct');
    if(pctEl) pctEl.innerHTML = Math.round(p*100)+'<i>%</i>';
    const stage = SCHED.filter(s=>el>=s.t).pop();
    if(stage && stage.stage) { $('#procStage').textContent = stage.stage; $('#procSub').textContent = stage.sub; }
    // 步骤状态
    const st = $$('#scr-processing .st');
    const stepMap = [[0,1500],[1500,3400],[3400,4800],[4800,99999]];
    stepMap.forEach((rng,i)=>{
      const s = st[i]; if(!s) return;
      s.classList.toggle('act', el>=rng[0] && el<rng[1]);
      s.classList.toggle('done', el>=rng[1]);
      const x = s.querySelector('.st-x');
      if(x) x.textContent = el>=rng[1] ? ['1.2s','3.1s','1.5s','1.0s'][i] : (el>=rng[0] ? '…' : '待');
    });
    if(el < end) requestAnimationFrame(tick);
    else if(!failMode){ finishProc(); }
    return;
  }
  requestAnimationFrame(tick);

  if(failMode){
    const T = (fn,ms)=>timers.push(setTimeout(fn, reduce?Math.min(ms,120):ms));
    LOGS.filter(l=>l.t<1900).forEach(l=>T(()=>log(l.s), l.t));
    T(()=>{
      log('钩子文案服务超时（12s 无响应）', true);
      $('#procStage').textContent = '第 2 步卡住了';
      $('#procSub').textContent = '上游排队，不是素材问题';
      const s2 = $('#st2');
      s2.classList.remove('act'); s2.classList.add('err');
      const x = s2.querySelector('.st-x'); if(x) x.textContent = '失败';
      const d = s2.querySelector('.st-d');
      if(d){ d.className = 'st-d'; d.innerHTML = '<svg class="ic"><use href="#i-alert"/></svg>'; }
    }, 2000);
    T(()=>go('fail'), 3000);
  } else {
    const T = (fn,ms)=>timers.push(setTimeout(fn, reduce?Math.min(ms,120):ms));
    LOGS.forEach(l=>T(()=>log(l.s), l.t));
  }
}

function log(s, err){
  const box = $('#procLog'); if(!box) return;
  const d = document.createElement('div');
  d.className = 'log-l' + (err?' err':'');
  d.innerHTML = `<i class="ldot"></i>${s}`;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

function finishProc(){ go('output'); if(autoOn) setTimeout(nextDemo, 1500); }
function queueAuto(ms){ clearTimeout(autoTimer); if(autoOn) autoTimer = setTimeout(nextDemo, ms); }

/* ---------- 微调屏 ---------- */
function resetRefine(){
  const fp = $('#hookPreview');
  if(fp) fp.innerHTML = 'POR QUE NINGUÉM<br>TE CONTOU ISSO?';
  $$('#scr-refine .hook').forEach((h,i)=>h.classList.toggle('on', i===0));
}

function resetFix(){
  const cap = $('#fixCap');
  if(cap){ cap.innerHTML = 'COMBO 3 PEÇAS<br>POR R$ 19,90'; cap.classList.add('unsafe'); cap.style.bottom=''; }
  const f = $('#fixFrame');
  if(f){ $('.unsafe-strip', f).style.opacity=''; $('.fix-flag', f).style.opacity=''; }
  $$('#scr-fix .fx').forEach((x,i)=>x.classList.toggle('on', i===0));
}

/* ---------- Toast ---------- */
let toastT = null;
function toast(msg){
  $('#toastT').textContent = msg;
  const el = $('#toast');
  el.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(()=>el.classList.remove('on'), 2600);
}

/* ---------- Sheet ---------- */
function openSheet(){ $('#sheet').classList.add('on'); $('#veil').classList.add('on'); }
function closeSheet(){ $('#sheet').classList.remove('on'); $('#veil').classList.remove('on'); }

/* ---------- 自动演示 ---------- */
function path(){
  const main = [...MAIN];
  if(failMode){
    const i = main.indexOf('processing');
    return [...main.slice(0,i+1), 'fail','degraded', ...main.slice(main.indexOf('output'))];
  }
  return main;
}
function nextDemo(){
  if(!autoOn) return;
  const p = path();
  let i = p.indexOf(cur);
  if(i < 0){ const all = SCREENS.map(s=>s.id); i = all.indexOf(cur); }
  const next = p[i+1];
  if(!next){ stopAuto(); return; }
  go(next);
  if(next === 'processing'){ return; }   // 由完成/失败回调接管
  const dwell = (next==='enter'||next==='output') ? 4200 : 3600;
  clearTimeout(autoTimer);
  autoTimer = setTimeout(nextDemo, dwell);
}
function startAuto(){
  autoOn = true; clearTimeout(autoTimer);
  const p = path();
  $('#btnAuto').classList.add('playing');
  $('#btnAuto').innerHTML = '<svg class="ic"><use href="#i-close"/></svg>结束演示';
  if(cur !== p[0]) go(p[0]);
  autoTimer = setTimeout(nextDemo, 2600);
}
function stopAuto(msg){
  autoOn = false; clearTimeout(autoTimer);
  const b = $('#btnAuto');
  b.classList.remove('playing');
  b.innerHTML = '<svg class="ic"><use href="#i-play"/></svg>自动演示';
  if(msg) toast(msg);
}

/* ---------- 交互绑定 ---------- */
function bind(){
  // 通用跳转
  document.addEventListener('click', e=>{
    const t = e.target.closest('[data-go]');
    if(t){ if(autoOn) stopAuto(); go(t.dataset.go); return; }
  });

  // 跳转 chips
  $('#chips').innerHTML = SCREENS.map(s=>`<button class="c-chip" data-go="${s.id}">${s.n} ${s.label}</button>`).join('');
  // 步骤点
  $('#railSteps').innerHTML = SCREENS.map(s=>`<button class="rs-btn" data-go="${s.id}" title="${s.label}">${s.n}</button>`).join('');

  // 失败开关
  $('#failSw').addEventListener('click', ()=>{
    failMode = !failMode;
    $('#failSw').classList.toggle('on', failMode);
    toast(failMode ? '已开启：改写会在第 2 步超时失败' : '已关闭失败模拟');
  });

  // 自动演示
  $('#btnAuto').addEventListener('click', ()=>{ autoOn ? stopAuto('已结束自动演示') : startAuto(); });
  $('#btnReset').addEventListener('click', ()=>{
    stopAuto(); stopProc(); failMode=false; $('#failSw').classList.remove('on');
    go('enter'); toast('已重置到第一屏');
  });

  // 上一屏 / 下一屏
  $('#btnPrev').addEventListener('click', ()=>{
    const all = SCREENS.map(s=>s.id); const i = all.indexOf(cur);
    if(i>0) go(all[i-1]);
  });
  $('#btnNext').addEventListener('click', ()=>{
    const all = SCREENS.map(s=>s.id); const i = all.indexOf(cur);
    if(i<all.length-1) go(all[i+1]);
  });

  // Sheet
  $('#openSheet').addEventListener('click', openSheet);
  $('#closeSheet').addEventListener('click', closeSheet);
  $('#veil').addEventListener('click', closeSheet);
  $('#sheetOk').addEventListener('click', closeSheet);

  // 钩子切换 + 应用
  $$('#scr-refine .hook').forEach(h=>{
    h.addEventListener('click', ()=>{
      $$('#scr-refine .hook').forEach(x=>x.classList.remove('on'));
      h.classList.add('on');
      const fp = $('#hookPreview');
      if(fp){ fp.style.opacity='0'; setTimeout(()=>{ fp.innerHTML = h.dataset.hook; fp.style.opacity=''; }, 140); }
    });
  });
  $('#applyHook').addEventListener('click', ()=>toast('已替换钩子 · 正在重新合成 4 个版本'));

  // 修正方案
  const applyFixVisual = (fx)=>{
    const cap = $('#fixCap'), frame = $('#fixFrame');
    const strip = $('.unsafe-strip', frame), flag = $('.fix-flag', frame);
    if(fx==='up'){ cap.style.bottom='46%'; cap.classList.remove('unsafe'); strip.style.opacity='0'; flag.style.opacity='0'; }
    if(fx==='short'){ cap.innerHTML='COMBO 3 PEÇAS<br>R$ 19,90'; cap.style.bottom='44%'; cap.classList.remove('unsafe'); strip.style.opacity='0'; flag.style.opacity='0'; }
    if(fx==='both'){ cap.style.bottom='55%'; cap.classList.remove('unsafe'); strip.style.opacity='0'; flag.style.opacity='0'; }
  };
  $$('#scr-fix .fx').forEach(f=>{
    f.addEventListener('click', ()=>{
      $$('#scr-fix .fx').forEach(x=>x.classList.remove('on'));
      f.classList.add('on'); applyFixVisual(f.dataset.fx);
    });
  });
  $$('#scr-fix .pb').forEach(b=>{
    b.addEventListener('click', ()=>{ $$('#scr-fix .pb').forEach(x=>x.classList.remove('on')); b.classList.add('on'); });
  });
  $('#applyFix').addEventListener('click', ()=>toast('已上移字幕 · 并写入规则手册（Shorts 默认 +6%）'));

  // 平台开关
  $$('#scr-platforms .plat').forEach(p=>{
    p.addEventListener('click', ()=>{
      p.classList.toggle('on');
      const n = $$('#scr-platforms .plat.on').length;
      $('.bb-i b').textContent = `已选 ${n} 个`;
      if(n===0) toast('至少选一个平台');
    });
  });
  $$('#scr-export .sw').forEach(s=>s.addEventListener('click', ()=>s.classList.toggle('on')));
  $$('#scr-rules .sw').forEach(s=>s.addEventListener('click', ()=>s.classList.toggle('on')));

  $('#doExport').addEventListener('click', ()=>toast('4 个版本已导出 · 3 个已排期'));
  $('#pinHook').addEventListener('click', ()=>toast('已设为葡语默认钩子句式'));

  // 键盘
  document.addEventListener('keydown', e=>{
    if(e.key==='ArrowRight'){ $('#btnNext').click(); }
    if(e.key==='ArrowLeft'){ $('#btnPrev').click(); }
    if(e.key==='Escape'){ closeSheet(); }
  });
}

/* ---------- 启动 ---------- */
function boot(){
  if(location.search.indexOf('shot=1')>=0) document.body.classList.add('shot');
  if(location.search.indexOf('frozen=1')>=0) document.body.classList.add('frozen');
  document.body.classList.add('booting');
  bind();
  const h = (location.hash||'').replace('#','');
  go(SCREENS.some(s=>s.id===h) ? h : 'enter', true);
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.remove('booting')));
  window.addEventListener('hashchange', ()=>{
    const id = (location.hash||'').replace('#','');
    if(SCREENS.some(s=>s.id===id) && id!==cur) go(id, true);
  });
}
boot();
