import React from 'react'

const MousePointer = () => {

  window.addEventListener("mousemove", (e) => {
    const pointer = document.querySelector("#mousePointer")
    if (pointer) {
      pointer.style.left = `${e.clientX}px`
      pointer.style.top = `${e.clientY}px`
    }
  })

  return (
    window.location.pathname !== "editor" &&
    <div id='mousePointer' className=' pointer-events-none fixed top-0 left-0 z-50 w-[150px] h-[150px]  -translate-y-[50%] -translate-x-[50%] rounded-full bg-[#0cf7ff8a] blur-[150px] ' ></div>
  )
}

export default MousePointer