$('#upload-input').change(function() {
    if (!this.files.length) return;

    for (let file of this.files) {
        const entry = makeEntry(URL.createObjectURL(file));
        $('#container').append(entry);
    }

    // HACK: 本当はすべての src の load をハンドルしたい
    setTimeout(todefy, 100);
});

const makeEntry = (src) => {
    return $('<div class="todefy-pair"> <img class="source" src="' + src + '"/> <p class="todefy-marker">== todefy! =&gt;</p> <img class="todefied" /> </div>');
}


const todeClear = () => {
    $('#container').empty();
}

const todefy = () => {
    const blocks = 4;
    const size = 200;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = size;
    canvas.height = size;
    $('.todefy-pair').each((i, pair) => {
        const source = $(pair).find('img.source')[0];
        const todefied = $(pair).find('img.todefied')[0];
        if (todefied.src) return;

        ctx.drawImage(source, 0, 0, blocks, blocks);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, blocks, blocks, 0, 0, size, size);
        todefied.src = canvas.toDataURL()
    })
};
