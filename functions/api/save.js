export async function onRequestPost(context){
const data=await context.request.json();

const res=await fetch("https://api.notion.com/v1/pages",{
method:"POST",
headers:{
Authorization:`Bearer ${context.env.NOTION_TOKEN}`,
"Notion-Version":"2022-06-28",
"Content-Type":"application/json"
},
body:JSON.stringify({
parent:{database_id:context.env.NOTION_DATABASE},
properties:{
Date:{date:{start:data.date}},
Systolic:{number:data.systolic},
Diastolic:{number:data.diastolic},
Pulse:{number:data.pulse},
"Blood Sugar":{number:data.bloodSugar},
Fasting:{checkbox:data.fasting},
Position:{select:{name:data.position}},
"Cuff Position":{select:{name:data.cuff}},
Notes:{rich_text:[{text:{content:data.notes||""}}]}
}
})
});

return new Response(await res.text(),{
status:res.status,
headers:{"Content-Type":"application/json"}
});
}
