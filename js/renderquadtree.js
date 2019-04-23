function renderQuadTree(qTree) {
    stroke(255);
    strokeWeight(1);
    noFill();
    const x = qTree.region.x;
    const y = qTree.region.y;
    const w = qTree.region.w;
    const h = qTree.region.h;
    rect(x, y, w, h);

    for (const subTree of qTree.subTrees) {
        renderQuadTree(subTree);
    }
}