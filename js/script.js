document.querySelector('a').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('body').scrollIntoView({ behavior: 'smooth' });
  });