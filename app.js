const d=document.getElementById("date");
d.value=new Date().toISOString().slice(0,16);

document.getElementById("save").onclick=async()=>{
const body={
date:d.value,
systolic:+sys.value,
diastolic:+dia.value,
pulse:+pulse.value,
bloodSugar:+sugar.value,
fasting:fasting.checked,
position:position.value,
cuff:cuff.value,
notes:notes.value
};

status.textContent="Saving...";

const r=await fetch("/api/save",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify(body)
});

status.textContent=r.ok?"Saved!":"Error saving.";
};
