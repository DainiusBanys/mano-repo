import express from "express";
import cors from 'cors'
import { dirname } from 'path'
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(
    import.meta.url))

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/index.html')

})



app.get('/receptas/:id', (req, res) => {
    const id = req.params.id
    const objektas = [{
            id: 1,
            ingredients: '<ul><li>600 gramų lašišos filė</li><li>0.5 vieneto	citrinų</li><li>2 šaukštai alyvuogių aliejaus</li><li>3 skiltelės	česnako</li><li>1 šaukštelis provanso žolelių</li><li>pagal skonį	druskos</li><li>1/4 šaukštelio pipirų</li></ul>',
            directions: '<ol><li>Iešmelius pamerkti į vandenį, kol ruošite lašišą, išmirkę iešmeliai mažiau svils.</li><li>Nuo lašišos filė nuimti odą, supjaustyti stambiais kubeliais.</li><li>	Į indelį įspausti česnaką, įspausti citrinos sultis, įtarkuoti geltonos žievelės dalies, berti druską, pipirus, žoleles, pilti aliejų. Išmaišyti. Sudėti lašišos kubelius, išmaišyti, kad gabalėliai tolygiai pasidengtų marinatu. Palikti marinuotis apie valandą, bet jei neturite laiko, galima kepti ir iš karto.</li><li>Lašišos kubelius mauti ant iešmelių, dėti į kepimo formą taip, kad į kraštus remtųsi tik iešmelių galai, o lašišos gabalėliai "kabėtų" ore. Aš tam naudoju stiklinę kepimo formą, jei neturite tinkamo dydžio formos, galima suglamžyti folijos gabalą į volelį, ir naudoti kaip atramą iešmeliams, ar dėti ant grotelių.</li><li>Kepti iki 200 C laipsnių įkaitintoje orkaitėje apie 3-4 minutes. Tada iešmelius apversti ir kepti dar 4-5 minutes. Kepti galima ir keptuvėje, geriausia grilio.</li><li>Skanu valgyti su ryžiais ar daržovių salotomis. Tiekiant, tinka pabarstyti šviežiais žalumynais, pvz. krapais ar petražolėmis.</li></ol>',
        },
        {
            id: 2,
            ingredients: '<ul><li>4 vienetai obuolių (didesnių)</li><li>180 gramų varškės</li><li>1 šaukštas graikiško jogurto (arba grietinės)</li><li>1 šaukštas medaus (arba klevų sirupo)</li><li>1 sauja razinų (arba džiovntų abrikosų ar datulių)</li><li>šiek tiek vanilės</li><li>1 saujelė graikinių riešutų (arba migdolų)</li><li>2 šaukšteliai medaus</li><li>1 šaukštelis	cinamono</li></ul>',
            directions: '<ol><li>Obuolius nuplauti ir nupjauti viršūnėles (nupjauti dalį su koteliais). Obuolių vidų atsargiai išskobti. Patogiausia skobti mažu šaukšteliu arba arbūziniu šaukšteliu (angliškai vadinamu "melon baller"). Obuolių odelę šiek tiek pabadyti šakute, jog kepant nesutrūkinėtų.</li><li>Įdarui varškę ištrinti su graikišku jogurtu, medumi ir šlakeliu vanilės. Įdėti razinas ir išmaišyti. Vietoje razinų tinka ir kiti džiovinti vaisiai, pavyzdžiui, džiovinti arbrikosai ar datulės ar kiti mėgiami, tik juos dėkite ne cielus, o supjaustykite kubeliais.</li><li>Varškės mase įdaryti obuolius ir juos sudėti ant kepimo popieriumi išklotos skardos.</li><li>Kepti iki 200 laipsnių įkaitintoje orkaitėje apie 20 minučių.</li><li>Kol kepa obuoliai, dubenėlyje sumaišyti pasmulkintus graikinius riešutus (jeigu norite stipresnio aromato, galite juos prieš tai truputį paskrudinti sausoje keptuvėje), medų ir cinamoną.</li><li>Ant iškepusių obuolių išdalinkite riešutų masę, o tada belieka imti ir skanauti! Beje, jeigu mėgstate saldžiau, iškepusius obuolius dar galite apšlakstyti trupučiu skysto medaus.</li></ol>',
        },
        {
            id: 3,
            ingredients: '<ul><li>500 gramų	varškės</li><li>2 vienetai kiaušinių</li><li>2 šaukštai	kukurūzų miltų (+apvoliojimui)</li><li>pagal skonį druskos</li></ul>',
            directions: '<ol><li>Į varškę įmušti kiaušinius, berti druską, kukurūzų miltus, gerai išminkyti.</li><li>Stalviršį pabarstyti kukurūzų miltais.</li><li>Gautą varškėčių masę apvoliojame kukurūzų miltuose, susukame į ritinio formą ir supjaustome į vienodo dydžio gabalėlius. Dar paformuojame tarp delnų. Gabalėlius sudedame į skardą išklotą kepimo popieriumi.</li><li>Kepame iki 180 C laipsnių įkaitintoje orkaitėje 10 minučių, apverčiame ir kepame dar 10 - 20 minučių.</li><li>Skaniausia su graikišku jogurtu ir trintomis uogomis.</li></ol>',
        }

    ]
    res.json(objektas[id])
})





console.log('veikia!')

app.listen(4000);