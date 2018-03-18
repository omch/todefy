let upload_input, container;

window.onload = () => {
    upload_input = document.querySelector('#upload-input');
    container = document.querySelector('#container');

    upload_input.addEventListener('change', () => {
        const files = upload_input.files;
        if (!files.length) return;

        const show_images = [];
        for (let file of files) {
            show_images.push(
                loadImage(URL.createObjectURL(file))
                    .then(img => appendEntry(img))
            );
        }

        Promise.all(show_images).then(() => todefy());
    });
};


const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        if (img.complete) {
            resolve(img);
        } else {
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', () => reject(img));
        }
    });
};

const appendEntry = (img) => {
    container.appendChild(makeEntry(img));
};

const makeEntry = (img) => {
    img.className = 'source';
    const parent = document.createElement('div');
    parent.className = 'todefy-pair';
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
