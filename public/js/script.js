// navbar start
// window.onscroll = function() {myFunction()};
    
//     function myFunction() {
    
//       if (document.documentElement.scrollTop > 10) {
//         document.getElementById("navbar").className = "navbar navbar-expand-lg border-bottom bg-dark ";
//       } else {
//         document.getElementById("navbar").className = "navbar navbar-expand-lg border-bottom";
//       }
//     }
// navbar end

// counter started here

function inVisible(element) {
    //Checking if the element is
    //visible in the viewport
    var WindowTop = $(window).scrollTop();
    var WindowBottom = WindowTop + $(window).height();
    var ElementTop = element.offset().top;
    var ElementBottom = ElementTop + element.height();
    //animating the element if it is
    //visible in the viewport
    if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
      animate(element);
  }
  
  function animate(element) {
    //Animating the element if not animated before
    if (!element.hasClass('ms-animated')) {
      var maxval = element.data('max');
      var html = element.html();
      element.addClass("ms-animated");
      $({
        countNum: element.html()
      }).animate({
        countNum: maxval
      }, {
        //duration 5 seconds
        duration: 5000,
        easing: 'linear',
        step: function() {
          element.html(Math.floor(this.countNum) + html);
        },
        complete: function() {
          element.html(this.countNum + html);
        }
      });
    }
  
  }
  
  
  //When the document is ready
  $(function() {
    //This is triggered when the
    //user scrolls the page
    $(window).scroll(function() {
      //Checking if each items to animate are 
      //visible in the viewport
      $("h3[data-max]").each(function() {
        inVisible($(this));
      });
    })
  });
  // counter end
    
  //  swiper js start
  // <!-- Initialize Swiper -->
           
              var swiper = new Swiper(".mySwiper", {
                slidesPerView: 1,
                spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
                loopFillGroupWithBlank: true,
                autoplay:true,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                  500: {
                    slidesPerView: 2
                  },
                  700: {
                    slidesPerView: 4
                  }
                }
              });
            
  //  swiper js end
  
  /* sroll down animation effect start */
  
  
  let left_box = document.querySelectorAll(".scroll_class1");
  let boxes = document.querySelectorAll(".scroll_class2");
  
  
  
  window.addEventListener("scroll", checkBoxes1);
  checkBoxes1();
  function checkBoxes1() {
      const triggerBottom = (window.innerHeight / 5) * 4;
      left_box.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;
          if (boxTop < triggerBottom) {
              box.classList.add("scroll_effect");
          } else {
              box.classList.remove("scroll_effect");
          }
      });
  }
  
  
  window.addEventListener("scroll", checkBoxes);
  checkBoxes();
  function checkBoxes() {
      const triggerBottom = (window.innerHeight / 5) * 4;
      boxes.forEach((box) => {
          const boxTop = box.getBoundingClientRect().top;
          if (boxTop < triggerBottom) {
              box.classList.add("scroll_effect");
          } else {
              box.classList.remove("scroll_effect");
          }
      });
  }
  
  /* scroll down animation effect end */
  
  // <!-- Initialize Swiper1 js-->
      
        var swiper = new Swiper(".mySwiper1", {
          effect: "cards",
          autoplay: true,
          grabCursor: true,
        });
  
    // js swiper1 end
  
    // js swiper2 start
    var swiper = new Swiper(".mySwiper2", {
      effect: "coverflow",
      grabCursor: true,
      loop: true,
      autoplay: true,
      centeredSlides: true,
      slidesPerView: 1,
     
      
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      breakpoints: {
        500: {
          slidesPerView: 2
        },
        700: {
          slidesPerView: 4
        }
      }
    });
  
      // js swiper2 end
  
  
      // review start
  
      const reviews = [
        {
          id: 1,
          name: "ram",
          job: "web developer",
          img:
            "./images/bg3.jpg",
          text:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt"
        },
        {
          id: 2,
          name: "anees",
          job: "web designer",
          img:
            "./images/bg2.jpg",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt"
        },
        {
          id: 3,
          name: "james",
          job: "intern",
          img:
            "./images/bg4.jpg",
          text:
            "SLorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt"
        },
        {
          id: 4,
          name: "san",
          job: "the boss",
          img:
            "./images/bg1.jpg",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iustoasperiores debitis incidunt"
        }
      ];
      
      const img = document.getElementById("person-img");
      const author = document.getElementById("author");
      const job = document.getElementById("job");
      const info = document.getElementById("info");
      
      const prevBtn = document.querySelector(".prev-btn");
      const nextBtn = document.querySelector(".next-btn");
      
      let currentItem = 0;
  
      window.addEventListener("DOMContentLoaded", () => {
        const item = reviews[currentItem];
        img.src = item.img;
        author.textContent = item.name;
        job.textContent = item.job;
        info.textContent = item.text;
      });
      
      // show person based on item
      function showPerson(person) {
        const item = reviews[person];
        img.src = item.img;
        author.textContent = item.name;
        job.textContent = item.job;
        info.textContent = item.text;
      }
      
      // show next person
      nextBtn.addEventListener("click", () => {
        currentItem++;
        if (currentItem > reviews.length - 1) {
          currentItem = 0;
        } 
        showPerson(currentItem);
      });
      
      // show prev person
      prevBtn.addEventListener("click", () => {
        currentItem--;
        if (currentItem < 0) {
          currentItem = reviews.length - 1;
        }
        showPerson(currentItem);
      });
  
      // second review
      
    
      // review end