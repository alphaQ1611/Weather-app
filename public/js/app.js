const form =document.querySelector('form')
const name=document.querySelector('input')
const p1=document.querySelector('#message-1')
const p2=document.querySelector('#message-2')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const n=name.value
    fetch('http://localhost:3000/weather?address='+n).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                p1.textContent=data.error
                p2.textContent=""
            }
            else{
                if(data.location===undefined){
                p1.textContent="No search term provided!"
                
                p2.textContent=""
                }
                else{
                p1.textContent=data.location
                p2.textContent=data.forecast
                }
            }
        })
    })
    
    
})