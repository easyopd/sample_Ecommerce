import{a as n,j as e}from"./react-vendor-BNWg92C-.js";import{m as i}from"./index-DGHVRrrZ.js";import"./vendor-DpNfi1_7.js";import"./firebase-vendor-C4yHmXkd.js";function u(){const r=n.useContext(i),{products:t,setProducts:a,updateProduct:c}=r;return e.jsx("div",{children:e.jsx("div",{className:" flex justify-center items-center h-screen",children:e.jsxs("div",{className:" bg-gray-800 px-10 py-10 rounded-xl ",children:[e.jsx("div",{className:"",children:e.jsx("h1",{className:"text-center text-white text-xl mb-4 font-bold",children:"Update Product"})}),e.jsx("div",{children:e.jsx("input",{type:"text",value:t.title,onChange:l=>a({...t,title:l.target.value}),name:"title",className:" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none",placeholder:"Product title"})}),e.jsx("div",{children:e.jsx("input",{type:"text",value:t.price,onChange:l=>a({...t,price:l.target.value}),name:"price",className:" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none",placeholder:"Product price"})}),e.jsxs("div",{children:[e.jsx("input",{type:"file",accept:"image/*",className:"bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"}),t.imageFile&&e.jsxs("div",{children:[e.jsxs("p",{children:["Selected File: ",t.imageFile.name]}),e.jsx("img",{src:URL.createObjectURL(t.imageFile),alt:"Selected",className:"mt-4 w-full h-auto rounded-lg"})]})]}),e.jsx("div",{children:e.jsx("input",{type:"text",value:t.category,onChange:l=>a({...t,category:l.target.value}),name:"category",className:" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none",placeholder:"Product category"})}),e.jsx("div",{children:e.jsx("textarea",{cols:"30",rows:"10",name:"title",value:t.description,onChange:l=>a({...t,description:l.target.value}),className:" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none",placeholder:"Product desc"})}),e.jsx("div",{className:" flex justify-center mb-3",children:e.jsx("button",{onClick:c,className:" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg",children:"Update Product"})})]})})})}export{u as default};
