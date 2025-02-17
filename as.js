import cheerio, { load } from 'cheerio'
import axios from 'axios'
import fs from 'fs'

async function nameSkill(tree) {
    let a = fs.readFileSync('./katana-skill.txt');
    //let a = await axios.get(`https://coryn.club/skill.php?tree=${tree || 'Blade'}`)
    let $ = cheerio.load(a)
    let data = []
    $('hr.separator').each(function(index, separator) {
        let element = $(separator).prev('div');
        const skillName = $(element).find('p.card-title').text().replace(/\s+/g, ' ').trim(); // Menghapus whitespace tambahan
        const skillDescription = $(element).find('p.medium').text().replace(/\s+/g, ' ').trim(); // Menghapus whitespace tambahan

        if (skillName && skillDescription) {
            data.push({
                name: skillName,
                tier: skillDescription.replace(/\D/g, ''),
                index
            });
        }
        // data.push({ nama: dataElement.eq(index).text().trim(), tier: dataElement.eq(index+1).text().trim() })
    });

    return data
}

async function getAllSkillData(index) {
    //let a = await axios.get('https://coryn.club/skill.php?tree=Blade')
    let a = fs.readFileSync('./katana-skill.txt');
    let $ = cheerio.load(a)
    let data = []
    $('div.monster-prop').each((index, element) => {
        let a = $(element)
        data.push(a.html())
    })
    return index ? data[index - 1] : data
}

async function getSkillData(index) {
    let $ = cheerio.load(await getAllSkillData(parseInt(index)))
    const data = {};
    let b = await nameSkill()
    $('div.span-2:has(div.accent-bold)').each((indd, ele) => {
        let only = $(ele).find('div.accent-bold p:not(:has(img))').text().trim();
        let isi = $(ele).find('p').text().trim().replace(only, '');
        if (only && isi) {
            data[only.toLowerCase()] = isi;
        }
    })

    $('div').each((ind, element) => {
        const key = $(element).find('p.accent-bold').text().trim().toLowerCase();
        const value = $(element).find('p').not('.accent-bold').text().trim();
        data.name = b[index - 1].name
        data.tier = b[index - 1].tier

    
        if (key && value) {
            data[key] = value;
        }
    });

    return data
}

async function listLeveling(lvl, gap, bonus) {
    // let a = await axios.get(`https://coryn.club/leveling.php?lv=${lvl}&gap=${gap}&bonusEXP=${bonus}`);
    let a = fs.readFileSync('./leveling-range.txt')
    let $ = load(a)
    let data = []
    $('div.level-row').each((index, ele) => {
        let a = $(ele).find('div')
        let name = $(a).eq(1).find('p b a').text().trim()
        let link = "https://coryn.club/" + $(a).eq(1).find('p b a').attr('href').trim()
        let lvl = $(a).eq(0).find('b').text().trim()
        let breakk = $(a).eq(2).text().replace(/\s+/g, ' ').trim()
        data.push({name, lvl, breakk, link})
    })
    return data;


}

async function pp() {;
let a = fs.readFileSync('./mons.txt')
// let a = await axios.get('https://coryn.club/leveling.php?lv=3&gap=10&bonusEXP=20');
let $ = cheerio.load(a)
let data = {}
data['boss'] = $('div.card-title-inverse').text().trim();
data['spawn'] = $('div.item-prop:has(div.accent-bold)').text().replace(/\s+/g, ' ').trim();
data['drop'] = {}
$('div.item-prop p.accent-bold').each(function() {
    let name = $(this).text().trim();
    let value = $(this).next('p').text().trim();
    
    if (name && value) {
        data[name.toLowerCase()] = value;
    }
})

$('div.monster-drop-list div.monster-drop').each(function() {
    let isi = $(this).text().trim();
    let drop = $(this).find('div a').attr('href');

    if (drop) {
        data['drop'][drop.replace(/\D/g, '')] = isi;
    }
})

return data

// Array untuk menyimpan data yang ditemukan

// let data = []
// let b = $('div.level-row')
// b = b.find('div').eq(1)
// $('div.level-row').each((index, ele) => {
//     let a = $(ele).find('div')
//     let name = $(a).eq(1).find('p b a').text().trim()
//     let link = $(a).eq(1).find('p b a').attr('href').trim()
//     let lvl = $(a).eq(0).find('b').text().trim()
//     let breakk = $(a).eq(2).text().replace(/\s+/g, ' ').trim()
// data.push({name, lvl, breakk, link})

// })
// const attributes = {};

// Loop untuk mengambil data dari setiap elemen div
// $('div').each((index, element) => {
//     // Ambil teks dari <p> pertama dan <p> kedua dalam <div>
//     const key = $(element).find('p.accent-bold').text().trim(); // Nama objek
//     const value = $(element).find('p').not('.accent-bold').text().trim(); // Isi objek

//     // Jika ada key dan value, tambahkan ke objek attributes
//     if (key && value) {
//         attributes[key] = value;
//     }
// });
    // Ambil teks dari <p> pertama dan <p> kedua dalam <div>
    // let element = $(elements).find('div')
    // const key = $(element).find('p.accent-bold').text().trim(); // Nama objek
    // const value = $(element).find('p').not('.accent-bold').text().trim(); // Isi objek

    // Jika ada key dan value, tambahkan ke objek attributes
    // if (key && value) {  q
    //     attributes[key] = value;
    // }
// b = b.prev('div')
// b = b.find('div p')
// Ambil semua elemen <hr> ber-class separator
// $('hr.separator').each(function(index, separator) {
//     let dataElement = $(separator).prev('div');
//     dataElement = dataElement.find('div p');
//     data.push({ nama: dataElement.first().text().trim(), tier: dataElement.eq(1).text().trim() })
// });
//let b = $('.skill-menu-container')
//const images = [];
//$('.skill-menu-container img').each((index, element) => {
//    images.push({
//        src: $(element).attr('src')
//    })
//  });
}

async function rii() {
    let a = await axios.get("https://coryn.club/monster.php?id=1084")
    let b = await axios.get("https://coryn.club/skill.php?tree=Martial")
    let c = await axios.get("https://coryn.club/item.php?type=27&order=atk%20DESC,name")
    let d = await axios.get("https://coryn.club/skill.php?tree=Mononofu")
    fs.writeFileSync('./mons.txt', a.data)
    fs.writeFileSync('./knuck-skill.txt', b.data)
    fs.writeFileSync('./katana.txt', c.data)
    fs.writeFileSync('./katana-skill.txt', d.data)

    return 1
}
async function p() {
    let a = (await import('./lib/scraper.js')).default
    // let b = await a.ml('Yup_xuan_happy').catch((e) => null)
    // let b = await a.kuso('seirei');
    let b = await a.ss('https://enka.network/u/839102841/')

    return b || "Id tidak ditemukan! Coba masukkan input dengan benar dan periksa id dan zona id dengan teliti"
}
pp().then(console.log)
// nameSkill().then((a) => console.log(a[0].name))
