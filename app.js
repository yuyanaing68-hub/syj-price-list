/* =========================
   FULL PRODUCT TABLES (ORIGINAL – 100% RESTORED)
========================= */
const TABLES = {
  pubg_uc:{label:"UC",items:[
    ["60",0.86],["180",2.58],["240",3.44],["325",4.3],["385",5.16],
    ["660",8.6]],["720",8.6],["985",12.9],["1320",17.2],["1800",21.5],
    ["3850",43],["8100",86],["16200",172]
  ]},

  mlbb_brl:{label:"Diamonds",items:[
    ["Weekly Pass",76],["Twilight Pass",402.5],
    ["Elite Weekly Package",39],["Epic Monthly Package",196.5],
    ["55",39],["165",116.9],["275",187.5],["565",385],
    ["86",61.5],["172",122],["257",177.5],["343",239],
    ["429",299.5],["514",355],["600",416.5],["706",480],
    ["878",602],["963",657.5],["1049",719],["1135",779.5],["1412",960],
    ["2195",1453],["3688",2424],["5532",3660],["9288",6079]
  ]},

  mlbb_ph:{label:"Diamonds",items:[
    ["Weekly Diamond Pass",95],["Twilight Pass",475],["11",10],["22",19],
    ["33",28.5],["44",38],["56",47.5],["112",95],["223",190],
    ["336",285],["570",475],["1163",950],["2398",1900],["6042",4750]
  ]},

  mlbb_ban:{label:"Diamonds",items:[
    ["Weekly Pass",2.032],["Weekly Elite Pack",0.969],
    ["Monthly Epic Pack",4.753],
    ["55",0.928],["165",2.774],["275",4.61],["565",9.384],
    ["14",0.235],["84",1.418],["210",3.55],["355",5.936],
    ["429",7.13],["513",8.548],["716",11.873],["772",12.832],
    ["870",14.484],["1060",17.697],["1192",17.901],["1460",23.919],
    ["1788",26.846],["3005",44.758],["4810",71.604],["6092",97.379],
    ["8218",130.417],["10833",171.982]
  ]},

  magic_chess:{label:"Diamonds",items:[
    ["Weekly Card",1.571],["55",0.724],["165",2.162],["275",3.601],
    ["565",7.191],["5",0.082],["11",0.153],["22",0.306],["56",0.745],
    ["86",1.122],["112",1.489],["172",2.254],["257",3.366],
    ["344",4.498],["516",6.752],["706",8.986],["1060",13.668],
    ["1163",14.923],["2195",26.979],["3688",44.962],["5532",67.442],
    ["6042",74.593],["9288",112.414]
  ]},

  arena:{label:"Token",items:[
    ["Beginner Select",0.632],["Bulletproof Case (30d)",1.928],
    ["Composition Case (30d)",5.814],["Advanced Battle Pass",3.274],
    ["Premium Battle Pass",9.517],["66",0.806],["335",4.202],
    ["675",8.191],["1690",20.492],["3400",42.514],
    ["6820",82.059],["13640",164.108],["20460",246.177]
  ]},

  hok:{label:"Token",items:[
    ["Honor Point Value Pack",0.286],["Double Token Lucky Bag",0.286],
    ["Standard Purchase Rebate Pack",0.286],["Premium Purchase Rebate Pack",1.204],
    ["Weekly Card",1.020],["Weekly Card Plus",2.978],["16",0.173],
    ["80",0.847],["240",2.56],["400",4.264],["560",5.977],
    ["830",8.548],["1245",12.821],["2508",25.643],
    ["4180",42.738],["8360",85.496]
  ]},

  pubg_packs:{label:"Product",items:[
    ["First Purchase Pack",0.88],
    ["Upgradable Firearm Materials Pack",2.657],
    ["Mythic Emblem Pack",4.431],
    ["Weekly Deal Pack 1",0.914],
    ["Weekly Deal Pack 2",2.741],
    ["Weekly Mythic Emblem Value Pack",3.318],
    ["Prime Pass 1 Month",0.88],
    ["Prime Pass 3 Month",2.64],
    ["Prime Pass 6 Months",5.28],
    ["Prime Pass 12 Months",10.56],
    ["Prime Pass Plus 1 Month",8.8],
    ["Prime Pass Plus 3 Months",26.4],
    ["Prime Pass Plus 6 Months",52],
    ["Prime Pass Plus 12 Months",105],
    ["Elite Pass LV1-50",5.3],
    ["Elite Pass LV1-100",10.692],
    ["Elite Pass Plus LV1-100",24.926]
  ]}
};

/* =========================
   ORIGINAL STATE
========================= */
let currentKey = null;
let profitMode = "percent";

/* =========================
   HELPERS
========================= */
function roundSell(value){
  if (value < 25) return 0;

  const base = Math.floor(value / 100) * 100;
  const rest = value - base;

  if (rest < 25) return base;        // 0–24
  if (rest < 75) return base + 50;   // 25–74
  return base + 100;                 // 75–100
}

const fmt = n => Math.round(n).toLocaleString("en-US");

/* =========================
   NAV
========================= */
function openTable(key){
  currentKey = key;
  home.classList.add("hidden");
  table.classList.remove("hidden");
  renderRows();
  loadTable();
  recalcPriceOnly();
  recalcEarnOnly();
}
function goHome(){
  table.classList.add("hidden");
  home.classList.remove("hidden");
}

/* =========================
   RENDER
========================= */
function renderRows(){
  tbody.innerHTML="";
  TABLES[currentKey].items.forEach((r,i)=>{
    tbody.innerHTML+=rowHTML(i+1,r[0],r[1]);
  });
}
function rowHTML(no,name,qty){
  return `
  <tr>
    <td>${no}</td>
    <td><input value="${name}"></td>
    <td><input class="qty" value="${qty}" oninput="recalcPriceOnly()"></td>
    <td class="og">0</td>
    <td><input class="profit" value="0" oninput="recalcPriceOnly()"></td>
    <td class="sell">0</td>

    <td>
      <div class="sold">
        <button onclick="chg(this,-1)">−</button>
        <input class="soldOut" value="0" oninput="recalcEarnOnly()">
        <button onclick="chg(this,1)">+</button>
      </div>
    </td>

    <td class="earn">0</td>
    <td><button class="remove-btn" onclick="this.closest('tr').remove(); recalcEarnOnly()">❌</button></td>
  </tr>`;
}
function addRow(){
  tbody.insertAdjacentHTML("beforeend",rowHTML("*","",0));
}

/* =========================
   SOLD OUT
========================= */
function chg(btn,d){
  const i = btn.parentElement.querySelector(".soldOut");
  i.value = Math.max(0,(+i.value||0)+d);
  recalcEarnOnly();
}

/* =========================
   PRICE CALC (ONLY RATE / PROFIT)
========================= */
function recalcPriceOnly(){
  const rate = +rateInput.value||0;
  const percentVal = +profitPercent.value||0;

  document.querySelectorAll("#tbody tr").forEach(tr=>{
    const qty = +tr.querySelector(".qty").value||0;
    const og = qty*rate;

    let profit;
    if(percentVal>0){
      profit = og*(percentVal/100);
    }else{
      profit = +tr.querySelector(".profit").value||0;
    }

    const sell = roundSell(og+profit);
    tr.querySelector(".og").textContent=Math.round(og);
    tr.querySelector(".sell").textContent=sell;
  });
  recalcEarnOnly();
}

/* =========================
   EARN CALC (REAL PROFIT)
========================= */
function recalcEarnOnly(){
  let total = 0;
  document.querySelectorAll("#tbody tr").forEach(tr=>{
    const og = +tr.querySelector(".og").textContent||0;
    const sell = +tr.querySelector(".sell").textContent||0;
    const sold = +tr.querySelector(".soldOut").value||0;
    const earn = Math.max(0,(sell-og)*sold);
    tr.querySelector(".earn").textContent = fmt(earn);
    total += earn;
  });
  totalEarn.textContent = fmt(total);
}

/* =========================
   COPY
========================= */
function copyTable(){
  let out="";
  document.querySelectorAll("#tbody tr").forEach(tr=>{
    const name=tr.children[1].querySelector("input").value.trim();
    const sell=tr.querySelector(".sell").textContent.trim();
    if(name && sell!=="0") out+=`${name} = ${sell}\n`;
  });
  navigator.clipboard.writeText(out);
  copyBtn.textContent="Copied ✓";
  setTimeout(()=>copyBtn.textContent="Copy",1200);
}

/* =========================
   SAVE / LOAD
========================= */
function saveTable(){
  const rows=[];
  document.querySelectorAll("#tbody tr").forEach(tr=>{
    rows.push({
      name:tr.children[1].querySelector("input").value,
      qty:tr.querySelector(".qty").value,
      profit:tr.querySelector(".profit").value,
      sold:tr.querySelector(".soldOut").value
    });
  });
  localStorage.setItem("table_"+currentKey,JSON.stringify({
    profitMode,
    rate:rateInput.value,
    profitPercent:profitPercent.value,
    rows
  }));
  saveBtn.textContent="Saved ✓";
  setTimeout(()=>saveBtn.textContent="Save",1200);
}
function loadTable(){
  const raw=localStorage.getItem("table_"+currentKey);
  if(!raw)return;
  const s=JSON.parse(raw);
  rateInput.value=s.rate||"";
  profitPercent.value=s.profitPercent||"";
  profitMode=s.profitMode||"percent";
  document.querySelectorAll("#tbody tr").forEach((tr,i)=>{
    if(!s.rows[i])return;
    tr.children[1].querySelector("input").value=s.rows[i].name;
    tr.querySelector(".qty").value=s.rows[i].qty;
    tr.querySelector(".profit").value=s.rows[i].profit;
    tr.querySelector(".soldOut").value=s.rows[i].sold||0;
  });
}
