const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        if($(entry.target).attr('aria-loaded')) return;
        
        var bar = new ProgressBar.SemiCircle(entry.target, {
            strokeWidth: 6,
            color: '#ED6A5A',
            trailColor: '#eee',
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 2000,
            svgStyle: null,
            text: {
                value: '',
                alignToBottom: false
            },
            from: {color: '#ED6A5A'},
            to: {color: '#32CD32'},
            
            step: (state, bar) => {
                bar.path.setAttribute('stroke', state.color);
                var value = Math.round(bar.value() * 100);
                if (value === 0) {
                    bar.setText('');
                } else {
                    bar.setText(value);
                }
            
                bar.text.style.color = state.color;
            }
        });

        bar.animate($(entry.target).attr('aria-valuenow')/100);
        $(entry.target).attr('aria-loaded', true);
      return;
    }
  });
});

$('*[id^="progress-animated-"]').each(function(i, obj) {
    observer.observe(document.getElementById($(this)[0].id));
});