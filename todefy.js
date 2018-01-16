const upload_input = document.querySelector('#upload-input');
const container = document.querySelector('#container');

upload_input.addEventListener('change', () => {
    const files = upload_input.files;
    if (!files.length) return;

    for (let file of files) {
        const entry = makeEntry(URL.createObjectURL(file));
        container.appendChild(entry);
    }

    // HACK: 本当はすべての src の load をハンドルしたい
    setTimeout(todefy, 300);
});

const makeEntry = (src) => {
    const parent = document.createElement('div');
    parent.className = 'todefy-pair';
    const img = document.createElement('img');
    img.className = 'source';
    img.src = src;
    const marker = document.createElement('p');
    marker.className = 'todefy-marker';
    marker.textContent = '== todefy! =>';
    const todefied = new Image();
    todefied.className = 'todefied';
    todefied.src = '#';
    parent.appendChild(img);
    parent.appendChild(marker);
    parent.appendChild(todefied);
    return parent;
};


const todeClear = () => {
    container.textContent = '';
};

const todefy = () => {
    const blocks = 4;
    const size = 200;
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = size;
    canvas.height = size;
    document.querySelectorAll('.todefy-pair').forEach((parent) => {
        const source = parent.querySelector('img.source');
        const todefied = parent.querySelector('img.todefied');
        if (todefied.src && todefied.src.substr(-1,1)!='#') return;

        ctx.drawImage(source, 0, 0, blocks, blocks);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, blocks, blocks, 0, 0, size, size);
        todefied.src = canvas.toDataURL();
    });
};
