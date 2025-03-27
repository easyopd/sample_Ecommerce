import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <div>
            <section className=''>
                <div className=" container mx-auto px-5 py-10">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{ color: mode === 'dark' ? 'white' : '' }}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>What our <span className=' text-pink-500'>customers</span> are saying</h2>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="/images/woman.png" />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">"I am absolutely in love with my Pashmina shawl! The quality is outstanding, and the fabric is so soft and warm. It feels luxurious yet lightweight, making it perfect for any occasion. The intricate craftsmanship is truly a work of art.
                                     I received so many compliments, and I can’t wait to order more. Highly recommended!"</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Kritika </h2>
                                
                            </div>
                        </div>
                       
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="/images/man.png" />
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="leading-relaxed">"I recently purchased a Pashmina shawl as a gift for my mother, and she was overjoyed! The texture is buttery soft, and the embroidery is exquisite. You can tell this is 100% authentic craftsmanship. The delivery was quick, and the packaging was elegant. Thank you for keeping this beautiful tradition alive!"</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Rahul</h2>
                                
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="/images/woman.png" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">"This Pashmina shawl exceeded my expectations! The fabric is so fine and warm, yet incredibly breathable. It drapes beautifully and adds an elegant touch to any outfit. I love how versatile it is—I can wear it as a wrap in winter or a stylish accessory in autumn. Worth every penny!"</p>
                                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Amanshi</h2>
                             
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial