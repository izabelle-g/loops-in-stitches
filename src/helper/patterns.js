function getColour(noiseVal) {
    let colour;
    let p = [ color("#ffd670"),
              color("#ff70a6"),
              color("#e9ff70"),
              color("#70d6ff"),
              color("#ff9770") ];
    
    if(noiseVal <= 0.375) {
        let n = map(noiseVal, 0, 0.375, 0, 1);
        colour = lerpColor(p[0], p[1], n);
    }
    else if(noiseVal > 0.375 && noiseVal <= 0.50) {
        let n = map(noiseVal, 0.375, 0.50, 0, 1);
        colour = lerpColor(p[1], p[2], n);
    }
    else if(noiseVal >= 0.625) {
        let n = map(noiseVal, 0.625, 1, 0, 1);
        colour = lerpColor(p[3], p[4], n); 
    }
    else {
        let n = map(noiseVal, 0.50, 0.625, 0, 1);
        colour = lerpColor(p[2], p[3], n);
    }
                      
    return colour;
}