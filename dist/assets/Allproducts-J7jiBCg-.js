import{r as i,u as E,g as P,i as S,j as e,Q as A}from"./vendor-CMAQCTUK.js";import{F as T}from"./Filter-BWq8JSwE.js";import{L as $}from"./Layout-oOn3-jb6.js";import{m as O,a as F}from"./index-Din93sqG.js";import"./firebase-vendor-C3qnd6S7.js";function H(){const x=i.useContext(O),{mode:r,product:u,searchkey:l,filterType:n,filterPrice:c}=x,h=E(),p=P(),d=S(t=>t.cart),f=t=>{p(F(t)),A.success("Added to cart!")};i.useEffect(()=>{localStorage.setItem("cart",JSON.stringify(d))},[d]),i.useEffect(()=>{window.scrollTo(0,0)},[]);const g=["Pashmina Kani","Aari","Sozni","Other"],[b,w]=i.useState({}),j=t=>{w(a=>({...a,[t]:!a[t]}))};return e.jsxs($,{children:[e.jsx(T,{}),e.jsx("section",{className:"text-gray-600 body-font",children:e.jsxs("div",{className:"container px-5 py-8 md:py-16 mx-auto",children:[e.jsxs("div",{className:"lg:w-1/2 w-full mb-6 lg:mb-10",children:[e.jsx("h1",{className:"sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900",style:{color:r==="dark"?"white":""},children:"Our Latest Collection"}),e.jsx("div",{className:"h-1 w-20 bg-pink-600 rounded"})]}),g.map(t=>{const a=u.filter(s=>s.category===t).filter(s=>l===""||s.title.toLowerCase().includes(l.toLowerCase())).filter(s=>n===""||s.category.toLowerCase()===n.toLowerCase()).sort((s,o)=>c==="low"?Number(s.price)-Number(o.price):c==="high"?Number(o.price)-Number(s.price):0),m=b[t],y=m?a:a.slice(0,4);return a.length>0&&e.jsxs("div",{className:"mb-10",children:[e.jsxs("h2",{className:"text-xl font-semibold mb-4 text-gray-900",style:{color:r==="dark"?"white":""},children:[t," Collection"]}),e.jsx("div",{className:"flex flex-wrap -m-4",children:y.map((s,o)=>{const{title:N,price:k,imageUrl1:v,id:C}=s;return e.jsx("div",{onClick:()=>h(`/productinfo/${C}`),className:"p-4 md:w-1/4 drop-shadow-lg cursor-pointer",children:e.jsxs("div",{className:"h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden",style:{backgroundColor:r==="dark"?"rgb(46 49 55)":"",color:r==="dark"?"white":""},children:[e.jsx("div",{className:"flex justify-center",children:e.jsx("img",{className:"rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out",src:v,alt:"product"})}),e.jsxs("div",{className:"p-5 border-t-2",children:[e.jsx("h2",{className:`tracking-widest text-xs title-font font-medium mb-1 ${r==="dark"?"text-gray-300":"text-gray-500"}`,children:"Hunar-Pashmina"}),e.jsx("h1",{className:`title-font text-lg font-medium mb-3 ${r==="dark"?"text-white":"text-black"}`,children:N}),e.jsxs("p",{className:`leading-relaxed mb-3 ${r==="dark"?"text-gray-300":"text-gray-800"}`,children:["₹",k]}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{type:"button",onClick:L=>{L.stopPropagation(),f(s)},className:"focus:outline-none text-white bg-blue-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2",style:{backgroundColor:r==="dark"?"gray":"#22333B"},children:"Add To Cart"})})]})]})},o)})}),a.length>4&&e.jsx("div",{className:"text-center mt-4",children:e.jsx("button",{onClick:()=>j(t),className:"text-white bg-pink-600 hover:bg-pink-700 font-medium rounded-lg text-sm px-6 py-2",children:m?"View Less":"View More"})})]},t)})]})})]})}export{H as default};
