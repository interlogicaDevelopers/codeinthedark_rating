export default {

    index: 0,

    createPlayer(data, id, view) {

        const df = document.createDocumentFragment();

        const c = document.createElement('a-entity');
        c.setAttribute('id', 'container-'+id);
        c.setAttribute('vote-marker', null);
        c.setAttribute("position", view.position);
        c.setAttribute("rotation", view.rotation);

        const f = document.createElement('a-entity');
        f.setAttribute("gltf-model", "#model-fighter-"+data.index);
        f.setAttribute("scale", "1 1 1");
        f.classList.add('clickable');
        f.setAttribute("data-id", data._id);
        c.appendChild(f);

    
        const b = document.createElement('a-image');
        b.setAttribute('color', '#fff');
        b.setAttribute('src', data.preview_url || '/assets/remote/placeholder.jpg');
        b.setAttribute('material', 'color: #fff; transparent: false; vertexColors: face; wireframeLinewidth: -7.23');
        b.setAttribute('height', 1);
        b.setAttribute('width', 1.5);
        b.setAttribute("position", [0, .6, .25].join(' '));
        b.classList.add('clickable');
        b.setAttribute("data-id", data._id);
        c.appendChild(b);

        const t = document.createElement('a-text');
        t.setAttribute("position", [0, 0, .6].join(' '));
        t.setAttribute('value', data.name);
        t.setAttribute('text', 'width: 10; align: center');
        c.appendChild(t);

        df.appendChild(c);
        return df;
    }

}