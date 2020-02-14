
function SepararTimes(jogadores){

    let times={
        timeA:[''],
        timeB:['']
    }

    let goleiros=jogadores.filter((elem)=>{
        return elem.goleiro===true
    })
    
    misturarArray(goleiros).forEach(elem => {
        times.timeA.length===times.timeB.length?times.timeA.push(elem):times.timeB.push(elem)
    });


    for(let nivel=5;nivel>0;nivel--){
        let jogador=jogadores.filter((elem)=>{
            return elem.goleiro===false && elem.nivel===nivel
        })
        misturarArray(jogador).forEach(elem => {
            times.timeA.length===times.timeB.length?times.timeA.push(elem):times.timeB.push(elem)
        })
    }
    
    return times

 }

 export default SepararTimes;


 function misturarArray(array){

    for(let i =array.length-1; i>0;i--){
        const j = Math.floor(Math.random()*i)
        const temp= array[i]
        array[i]=array[j]
        array[j]=temp
    }

    return array
 }