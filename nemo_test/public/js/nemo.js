document.addEventListener('DOMContentLoaded', ()=>{
    const sections = document.querySelectorAll('.nemo');
  
    sections.forEach(section => {
      section.addEventListener('click', function() {
        if (!this.classList.contains('clicked')) {
          this.classList.add('clicked');
          this.style.backgroundColor = 'blue';
        } else {
          this.classList.remove('clicked');
          this.style.backgroundColor = '';
        }
      });
    });
  });
//   -----------------------------------------