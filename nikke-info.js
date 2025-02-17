const { fetchJson } = require("../../core");
const Canvas = require('canvas');
const { default: axios } = require('axios');
const cheerio = require('cheerio');

module.exports = {
name: "nikke-info",
category: "weebs",
desc: "takes character details from nikke",
isSpam: true,
query: "how to use: #nikke-info [query]\nexample: #nikke-info alice or list (to list available characters)",
use: "<name>",
async run({ msg, conn }, { q, map, args }) {

if(q === "list"){
let chara = [];
for (let color of await getCharaList().name){
    chara.push(({title: `${color.name}`, rowId: `#nikke-info ${color.name}`}));
}
const sections = [
    {
	title: "</Hello World>",
	rows: chara
    }
]
const listMessage = {
  text: `*List of Nikke Characters`,
  footer: "choose what you want",
  title: "Nikke Goddess of Victory",
  buttonText: "search",
  sections
}
await conn.sendMessage(msg.from, listMessage, { quoted: msg })
} else if(!q === "list") {
try {
ddb = await getDetail(q.toLowerCase())
thumbnya = await getCharaList().find(x => x.name === q.toLowerCase()).img;
    stri_skil = ""
    for (let color of ddb.skill) {
    stri_skil += `- *${color.name}*\n`
    }
    
teksnya = `
* About*
*• Name :* ${ddb.name}.
*• Weapon :* ${ddb.weapon}
*• Role :* ${ddb.role}
*• Element :* ${ddb.element}
*• Rarity :* ${ddb.rarity}
*• Faction :* ${ddb.faction}
*• Team Role :* ${ddb.team_role}


* Stats*
*•Max*
*• HP :* _${ddb.max_stats.hp}_
*• ATK :* _${ddb.max_stats.atk}_
*• DEF :* _${ddb.max_stats.def}_

*•Min*
*• HP :* _${ddb.min_stats.hp}_
*• ATK :* _${ddb.min_stats.atk}_
*• DEF :* _${ddb.min_stats.def}_

*Skills*
${stri_skil}

* Overview*
${ddb.overview}
`
await conn.sendMessage(
msg.from,
{
image: await conn.getBuffer(ddb.image),
caption: str,
contextInfo:{
externalAdReply: {
title: "© " + config.namebot,
body: "Nikke Goddess of Victory",
mediaType: 1,
mediaUrl: 'https://www.instagram.com/reel/CcLz2dOFW4O/?utm_source=ig_web_copy_link', 
thumbnailUrl: thumbnya, sourceUrl: "https://nikke-goddess-of-victory-international.fandom.com/wiki/Home" }}},
{ quoted: msg });
} catch (e) {
msg.reply(e)
}

} else {
msg.reply("*NOT-FOUND*")
}
} 
};




async function getDetail(qu){
const response = await axios.get('https://gachax.com/nikke-gov/character/'+ qu + '/');
    const $ = cheerio.load(response.data);
    img = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-2-5.text-center > div > img").attr('src');
    max_hp = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(2)").text().replace(/\s+/g,'').trim()
	max_atk = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(4)").text().replace(/\s+/g,'').trim()
	max_def = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(1) > div > div.page-box > div > div:nth-child(6)").text().replace(/\s+/g,'').trim()
	min_hp = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(2)").text().replace(/\s+/g,'').trim()
    min_atk = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(4)").text().replace(/\s+/g,'').trim()
    min_def = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(3) > div:nth-child(2) > div > div.page-box > div > div:nth-child(6)").text().replace(/\s+/g,'').trim()
	nama = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div:nth-child(1) > div > h1").text().replace(/\s+/g,' ')
	rarity = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(3) > div > img").attr('src').split('/img/')[1].split('.png')[0]
	role = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(4) > div > span").text()
	element = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(5) > div > span").text()
	weapon = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(7) > span > span").text()
	story = $("#app > div > section:nth-child(6) > div > div > div.pb-30 > div > div.pure-u-1.mt-20 > div").text() || null
	factions = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(8) > span").text().trim()
	team_roles = $("#app > div > section.chess-bg.pb-30 > div > div.pure-u-1.pure-u-md-3-5.text-center.mmt-40 > div.mt-20.center-mobile > div > div:nth-child(11) > span").text().trim()
	const selectors = Array.from($("#app > div > section:nth-child(5) > div > div > div.page-box.mt-20 > div"));
    let skills = [];
    for (let i = 0; i < selectors.length; i++) {
    skills.push({name: $("#app > div > section:nth-child(5) > div > div > div.page-box.mt-20 > div:nth-child(" + Number(i+1) + ") > div.pure-u-1.pure-u-md-4-5.pure-u-lg-7-8.text-left > div.skill-title.center-mobile").text().trim()})
    }
	overview = $("#app > div > section:nth-child(3) > div > div > div.pb-30 > p").text()
	pinal = {
    name: nama,
    image: img,
    weapon: weapon,
    rarity: rarity,
    role: role,
    element: element,
    overview: overview,
    faction: factions,
    team_role: team_roles,
    max_stats: {
    hp: max_hp,
    atk: max_atk,
    def: max_def
    },
    min_stats: {
    hp: min_hp,
    atk: min_atk,
    def: min_def
    },
    story: story,
    skill: skills
    }
    return pinal
}

async function getCharaList(){
        //let cheerio = require('cheerio')
        const response = await require('axios').get('https://nikke-db.github.io/js/json/released_units.js');
          // Throw error if fetch fails
          if (response.statusText !== 'OK') {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
          } else {
            const inti = eval(response.data.slice(23))
            let total = []
            for (let i = 0; i < inti.length; i++) {
                total.push({
                    name: inti[i],
                    img: `https://gachax.com/nikke-gov/wp-content/uploads/sites/20/2022/08/${inti[i].toLowerCase()}.png`
                })
            }
            return total
  }
}