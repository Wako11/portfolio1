

// Portofolio Item Filter

const filterContainer = document.querySelector(".portofolio-filter"),
    filterBtns=filterContainer.children,
    totalFilterBtn=filterBtns.length,
    portofolioItems=document.querySelectorAll(".portofolio-item"),
    totalPortofolioItem=portofolioItems.length;
    
    for(let i=0; i<totalFilterBtn; i++){
        filterBtns[i].addEventListener("click", function(){
            filterContainer.querySelector(".active").classList.remove("active");
            this.classList.add("active");

            const filterValue=this.getAttribute("data-filter");
            for(let k=0; k<totalPortofolioItem; k++){
                if(filterValue === portofolioItems[k].getAttribute("dat-category")){
                   portofolioItems[k].classList.remove("hide");
                    portofolioItems[k].classList.add("show");
                }
                else{
                    portofolioItems[k].classList.remove("show");
                    portofolioItems[k].classList.add("hide");
                }
                if(filterValue==="all"){

                }
            }
        })

    }

    //Portofolio Lightbox
    const lightbox = document.querySelector(".lightbox"),
        lightboxImg=lightbox.querySelector(".lightbox-img"),
        lightboxText=lightbox.querySelector(".caption-text"),
        lightboxClose=lightbox.querySelector(".lightbox.close"),
        lightboxCounter=lightbox.querySelector(".caption-counter");
    let itemIndex=0;

    for(let i=0; i<totalPortofolioItem; i++){
        portofolioItems[i].addEventListener("click",function(){
        itemIndex=i;
        changeItem();
        toggleLightbox();
        })
    }
    function nextItem(){
        if(itemIndex === totalPortofolioItem-1){
            itemIndex=0;
        }
        else{
            itemIndex++
        }
       changeItem();
    }

    function prevItem(){
        if(itemIndex === 0){
            itemIndex=totalPortofolioItem-1;
        }
        else{
            itemIndex++
        }
       changeItem();
    }
    function toggleLightbox(){
        lightbox.classList.toggle("open");
    }
    function changeItem();
    {
       imgSrc=portofioItems[itemindex].querySelector(".portofolio-img img").getAttribute("src");
       lightboxImg.src=imgSrc;
       lightboxText.innerHTML=portofolioItems[itemIndex].querySelector("h4").innerHTML;
       lightboxCounter.innerHTML = (itemIndex+1) + " of " + totalPortofolioItem;
    }

    //close Lightbox
    lightbox.addEventListener("click",function(event){
        if(event.target===lightboxClose || event.target === lightbox){
            toggleLightbox();
        }
    })