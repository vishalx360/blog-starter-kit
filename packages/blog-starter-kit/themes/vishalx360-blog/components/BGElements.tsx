import Image from 'next/image'
import React from 'react'

function BGElements() {
    return (
        <div className='hidden md:block z-[0]'>
            <div className="bg_circle opacity-20"></div>
            <Image
                height={600}
                width={300}
                className="hidden md:block dot_matrix_graphic bounce opacity-10 "
                id="hero_dot_matrix_graphic"
                src="/images/graphic/dot_matrix_graphic.svg"
                alt="graphic"
            />
        </div>
    )
}

export default BGElements