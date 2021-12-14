import React from 'react'

export default function AboutUs() {

    const ImageStyle = {
        width: "80%",
        height: "auto",
        borderRadius: "1rem"
    }
    return (
        <div className="container my-5">
            <span className="display-2">About Us</span>

            <div className="row my-5">
                <div className="col">
                    {/* Here we will have some content and to the right we will have some images */}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vel eaque hic voluptatem ducimus, aspernatur odio fugit asperiores possimus cum. Voluptatibus ipsum impedit fugiat cum necessitatibus aspernatur eos nostrum magni omnis, consequuntur, minus eaque porro eius. Beatae nisi natus quod ipsa ipsam doloremque inventore. Veritatis et maxime repudiandae nobis, itaque ad necessitatibus perspiciatis animi facilis, officia accusantium distinctio nisi, consequatur laboriosam blanditiis. Dolorum ex odio corrupti voluptas autem dolor dolore dolorem adipisci corporis magni perspiciatis laborum voluptatem, repellendus nihil suscipit consequatur ad expedita dignissimos eius, eveniet qui. Magnam, mollitia. Suscipit fuga molestias dolores voluptatibus, facilis praesentium nemo illum animi et eius illo quaerat a pariatur maxime dolor quidem. Pariatur ea, veritatis suscipit laborum nisi deleniti, quia autem repudiandae id nihil optio consectetur eveniet excepturi nulla consequuntur illum! Autem odit magni sapiente suscipit necessitatibus ducimus dolor in neque dolore laboriosam consequatur modi iste dicta minima ipsa eveniet amet perferendis, doloremque sunt error? Id debitis voluptatum labore est obcaecati, voluptatem ex sed eos expedita accusantium delectus iste saepe neque eaque repudiandae quos quaerat nulla ea fugit reiciendis. Culpa voluptatum odio vel et! Necessitatibus repellendus non provident ullam omnis rem recusandae, pariatur quibusdam ad accusamus expedita assumenda dolorum placeat iste quidem molestias esse!</p>
                </div>
                <div className="col">
                    <img src={require("../Assets/About1.jpg").default} alt="" className='w-100' style={ImageStyle} />
                </div>
            </div>
            <hr />
            <div className="row my-5">
                <div className="col">
                    <img src={require("../Assets/About2.jpg").default} alt="" className='w-100' style={ImageStyle} />
                </div>
                <div className="col">
                    {/* Here we will have some content and to the right we will have some images */}
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid vel eaque hic voluptatem ducimus, aspernatur odio fugit asperiores possimus cum. Voluptatibus ipsum impedit fugiat cum necessitatibus aspernatur eos nostrum magni omnis, consequuntur, minus eaque porro eius. Beatae nisi natus quod ipsa ipsam doloremque inventore. Veritatis et maxime repudiandae nobis, itaque ad necessitatibus perspiciatis animi facilis, officia accusantium distinctio nisi, consequatur laboriosam blanditiis. Dolorum ex odio corrupti voluptas autem dolor dolore dolorem adipisci corporis magni perspiciatis laborum voluptatem, repellendus nihil suscipit consequatur ad expedita dignissimos eius, eveniet qui. Magnam, mollitia. Suscipit fuga molestias dolores voluptatibus, facilis praesentium nemo illum animi et eius illo quaerat a pariatur maxime dolor quidem. Pariatur ea, veritatis suscipit laborum nisi deleniti, quia autem repudiandae id nihil optio consectetur eveniet excepturi nulla consequuntur illum! Autem odit magni sapiente suscipit necessitatibus ducimus dolor in neque dolore laboriosam consequatur modi iste dicta minima ipsa eveniet amet perferendis, doloremque sunt error? Id debitis voluptatum labore est obcaecati, voluptatem ex sed eos expedita accusantium delectus iste saepe neque eaque repudiandae quos quaerat nulla ea fugit reiciendis. Culpa voluptatum odio vel et! Necessitatibus repellendus non provident ullam omnis rem recusandae, pariatur quibusdam ad accusamus expedita assumenda dolorum placeat iste quidem molestias esse!</p>
                </div>
            </div>
        </div>
    );
}
