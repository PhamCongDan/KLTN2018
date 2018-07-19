export function summaryprice(dateCI,dateCO,price,numofroom){
    let d1=dateCI.split("/")
    let d2=dateCO.split("/")
    let da1=d1[2]+"/"+d1[1]+"/"+d1[0]
    let da2=d2[2]+"/"+d2[1]+"/"+d2[0]
    var numberofday= Math.round(Math.abs((Date.parse(da2)-Date.parse(da1))/(24*60*60*1000)))
    return {
        numday:numberofday,
        price:numberofday*price*numofroom
    }

}