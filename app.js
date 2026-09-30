const stats=document.querySelector('[data-stats]');
if(stats){
  const reveal=()=>stats.classList.add('visible');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){reveal()}else{
    const io=new IntersectionObserver(([entry])=>{if(entry?.isIntersecting){reveal();io.disconnect()}},{threshold:.25});io.observe(stats)
  }
}
const form=document.querySelector('[data-form]');
if(form){form.addEventListener('submit',e=>{e.preventDefault();form.hidden=true;document.querySelector('[data-success]')?.classList.add('show')})}
