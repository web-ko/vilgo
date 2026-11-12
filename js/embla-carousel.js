// ჰოვერი მთელ ობიექტზე
// document.addEventListener('DOMContentLoaded', () => {
//   const viewportNode = document.querySelector('.embla__viewport')

//   if (!viewportNode) {
//     console.error('Embla viewport not found!')
//     return
//   }

//   // ინიციალიზაცია გლობალური ობიექტებით
//   const emblaApi = EmblaCarousel(
//     viewportNode, 
//     { 
//       loop: true,
//       align: 'start',
//       dragFree: true
//     }, 
//     [
//       EmblaCarouselAutoScroll({
//         speed: .5,
//         startDelay: 0,
//         stopOnInteraction: false,
//         stopOnMouseEnter: true
//       })
//     ]
//   )
// })

// ჰოვერი მხოლოდ ფოტოზე
document.addEventListener('DOMContentLoaded', () => {
  const viewportNode = document.querySelector('.embla__viewport')

  if (!viewportNode) {
    console.error('Embla viewport not found!')
    return
  }

  // ვქმნით AutoScroll პლაგინს ისე, რომ stopOnMouseEnter იყოს false
  const autoScroll = EmblaCarouselAutoScroll({
    speed: 0.5,
    startDelay: 0,
    stopOnInteraction: false,
    stopOnMouseEnter: false // ვთიშავთ სტანდარტულ ქცევას
  })

  // ინიციალიზაცია
  const emblaApi = EmblaCarousel(
    viewportNode, 
    { 
      loop: true,
      align: 'start',
      dragFree: true
    }, 
    [autoScroll]
  )

  // ვპოულობთ ყველა სურათს კარუსელში
  const images = viewportNode.querySelectorAll('.embla__slide img')

  images.forEach(img => {
    // როცა მაუსი მიდის სურათზე - ჩერდება
    img.addEventListener('mouseenter', () => {
      const autoScrollPlugin = emblaApi.plugins().autoScroll
      if (autoScrollPlugin) autoScrollPlugin.stop()
    })

    // როცა მაუსი გადის სურათიდან - აგრძელებს მოძრაობას
    img.addEventListener('mouseleave', () => {
      const autoScrollPlugin = emblaApi.plugins().autoScroll
      if (autoScrollPlugin) autoScrollPlugin.play()
    })
  })
})




