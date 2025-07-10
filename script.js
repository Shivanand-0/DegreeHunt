const proxyUrl = "https://https-proxy-y7p3.onrender.com/";
let url='http://universities.hipolabs.com/search?name=';

let keywordBtn=document.querySelector('#keyword-btn');
let countryBtn=document.querySelector('#country-btn');
let nameBtn=document.querySelector('#name-btn');

let keywordIp=document.querySelector('#keyword-ip');
let countryIp=document.querySelector('#country-ip');
let nameIp=document.querySelector('#name-ip');

let lst=document.querySelector('#result');
let heading=document.querySelector('#c-name');
let country="";
let keyword="";
let college="";


let getKeyword=()=>{
    keyword=keywordIp.value;
    if(keyword!=""){
        heading.innerText=`List of Colleges in ${keyword}: `;
        keywordIp.value=""
    }else{
        heading.innerText=`Please Enter Country Name...`;
        lst.innerText="";
    }
}

let getCountry=()=>{
    country=countryIp.value;
    if(country!=""){
        heading.innerText=`List of Colleges in ${country}: `;
        countryIp.value=""
    }else{
        heading.innerText=`Please Enter Country Name...`;
        lst.innerText="";
    }
}


let getName=()=>{
    college=nameIp.value;
    if(college!=""){
        heading.innerText=`List of Colleges in ${college}: `;
        nameIp.value=""
    }else{
        heading.innerText=`Please Enter Country Name...`;
        lst.innerText="";
    }
}


let getCollegeList=async ()=>{
    
    if(keyword!=""){
        try{
            console.log("in keyword section", keyword)
            let res=await axios.get(proxyUrl+url+keyword);
            console.log(res)
            if(res && res.data.length==0){
                heading.innerText=`SORRY! Data is not availible for this keyword.`
                keyword=""
                return;
            }
            for(let col of res.data){
                    let list=document.createElement('li');
                    let anchor=document.createElement('a');
                    list.innerText=col.name
                    anchor.setAttribute('href',col.web_pages[0]);
                    anchor.setAttribute('target','_blank');
                    anchor.appendChild(list);
                    lst.appendChild(anchor);
            }
            if(lst.innerText==""){
               heading.innerText=`SORRY! Data is not availible for this keyword.`
               keyword=""
                return; 
            }
            keyword=""
        }catch(e){
            heading.innerText=`Get Error While Fetching Data`;
            console.log('error: ',e );
        }
    }
    else if(country!=""){
        try{
            console.log("in country section", country)
            let res=await axios.get(proxyUrl+url+country);
            console.log(res.data)
            if(res && res.data.length==0){
                heading.innerText=`SORRY! Data is not availible for this country name.`
                country="";
                return;
            }
            for(let col of res.data){
                if(col.country.toLowerCase()==country.toLowerCase()){
                    let list=document.createElement('li');
                    let anchor=document.createElement('a');
                    list.innerText=col.name;
                    anchor.setAttribute('href',col.web_pages[0]);
                    anchor.setAttribute('target','_blank');
                    anchor.appendChild(list);
                    lst.appendChild(anchor);
                } 
            }
            if(lst.innerText==""){
               heading.innerText=`SORRY! Data is not availible for this country name.`
               country="";
                return; 
            }
            country="";
        }catch(e){
            heading.innerText=`Get Error While Fetching Data`;
            console.log('error: ',e );
        }
    }
    else if(college!=""){
        try{
            console.log("in college section", college)
            let res=await axios.get(proxyUrl+url+college);
            console.log(res.data)
            if(res && res.data.length==0){
                heading.innerText=`SORRY! Data is not availible for this college name.`
                college=""
                return;
            }
            for(let col of res.data){
                if(col.name.toLowerCase()==college.toLowerCase()){
                    let list=document.createElement('li');
                    let anchor=document.createElement('a');
                    list.innerText=col.name
                    anchor.setAttribute('href',col.web_pages[0]);
                    anchor.setAttribute('target','_blank');
                    anchor.appendChild(list);
                    lst.appendChild(anchor);
                } 
            }
            if(lst.innerText==""){
               heading.innerText=`SORRY! Data is not availible for this college name.`
               college=""
                return; 
            }
            college=""
        }catch(e){
            heading.innerText=`Get Error While Fetching Data`;
            console.log('error: ',e );
        }
    }
    
}


keywordBtn.addEventListener('click',()=>{
    lst.innerText="";
    heading.innerText="";
    getKeyword()
    getCollegeList()
})
countryBtn.addEventListener('click',()=>{
    lst.innerText="";
    heading.innerText="";
    getCountry()
    getCollegeList()
})
nameBtn.addEventListener('click',()=>{
    lst.innerText="";
    heading.innerText=""
    getName()
    getCollegeList()
})