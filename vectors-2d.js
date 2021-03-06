class V2D {

    constructor() {

        this.precision = 20; // accuracy in floats (0 to 20)

        // set x and y
        if (arguments.length === 2) { // (0,0)
            this.reset(arguments[0], arguments[1]);
        } else if (Array.isArray(arguments[0])) { // ([0,0])
            this.reset(arguments[0][0], arguments[0][1]);
        } else { // ({x:0, y:0})
            this.reset(arguments[0].x, arguments[0].y);
        }

    }

    /**
     * set's x and y, pass 2 numbers or a V2D
     * @param {Number | V2D} x 
     * @param {Number} y 
     */
    reset(x, y) {
        if (y !== undefined) {
            this.x = x;
            this.y = y;
            return this;
        } // else
        this.x = x.x;
        this.y = x.y;
        return this;
    }

    /**
     * returns a cloned vector which won't affect this one
     * @returns {V2D}
     */
    clone() {
        return new V2D(this.x, this.y);
    }

    /**
     * precise's the given value
     * @returns {Number}
     */
    precise(num) {
        return num.toFixed(this.precision) / 1;
    }

    // ---------------------------
    //          + - * /
    // ---------------------------

    /**
     * adds the "von" to this vector (vector or Number)
     * @param {V2D | Number} von 
     */
    add(von) {
        this.x += von.x !== undefined ? von.x : von;
        this.y += von.y !== undefined ? von.y : von;
        return this;
    }

    /**
     * subtracts the "von" from this vector (vector or Number)
     * @param {V2D | Number} von 
     */
    subtract(von) {
        this.x -= von.x !== undefined ? von.x : von;
        this.y -= von.y !== undefined ? von.y : von;
        return this;
    }

    /**
     * multiplies this vector by "von" (vector or Number)
     * @param {V2D | Number} von 
     */
    multiply(von) {
        this.x *= von.x !== undefined ? von.x : von;
        this.y *= von.y !== undefined ? von.y : von;
        return this;
    }

    /**
     * divides this vector to "von" (vector or Number)
     * @param {V2D | Number} von 
     */
    divide(von) {
        this.x /= von.x !== undefined ? von.x : von;
        this.y /= von.y !== undefined ? von.y : von;
        return this;
    }



    // ---------------------------
    //           size 
    // ---------------------------

    /**
     * resizes the vector to "size"
     * @param {Number} size
     */
    resize(size) {
        if (this.length) return this.multiply(size / this.length);
        else return this.reset(0, 0);
    }

    /**
     * normalizes the vector (sets length to 1)
     */
    normalize() {
        return this.resize(1);
    }

    /**
     * limits the vector's length by "min" and "max"
     * @param {Number} min 
     * @param {Number} max 
     */
    limit(min, max) {
        let len = this.length;
        if (len > max) this.resize(max);
        else if (len < min) this.resize(min);
        return this;
    }

    /**
     * adds the size to vector's length 
     * @param {Number} size
     */
    addSize(size) {
        return this.resize(this.length + size);
    }

    /**
     * subtracts the size from vector's length 
     * @param {Number} size
     */
    subtractSize(size) {
        return this.resize(this.length - size);
    }

    /**
     * multiplies vector's length by the size
     * @param {Number} size
     */
    multiplySize(size) {
        return this.resize(this.length * size);
    }

    /**
     * divides vector's length by the size
     * @param {Number} size
     */
    divideSize(size) {
        return this.resize(this.length / size);
    }

    /**
     * returns the distance to "vec"
     * @param {V2D} vec 
     * @returns {Number}
     */
    distanceTo(vec) {
        return this.clone().subtract(vec).length;
    }


    // ---------------------------
    //      angle & direction 
    // ---------------------------

    /**
     * reverses the vector (rotate 180 degree)
     */
    reverse() {
        this.x *= -1;
        this.y *= -1;
        return this;
    }

    /**
     * rotates the vector to the degrees
     * @param {number} degrees
     */
    rotateTo(degrees) {
        let len = this.length;
        let radians = degrees / 180 * Math.PI;
        this.x = this.precise(Math.cos(radians) * len);
        this.y = this.precise(Math.sin(radians) * len);
        return this;
    }

    /**
     * rotates the vector by the degrees
     * @param {number} degrees
     */
    rotate(degrees) {
        degrees += this.angle;
        return this.rotateTo(degrees);
    }

    /**
     * rotates the vector to the radians
     * @param {number} radians
     */
    rotateToRD(radians) {
        let len = this.length;
        this.x = this.precise(Math.cos(radians) * len);
        this.y = this.precise(Math.sin(radians) * len);
        return this;
    }

    /**
     * rotates the vector by the radians
     * @param {number} radians
     */
    rotateRD(radians) {
        radians += this.angleRD;
        return this.rotateTo(radains);
    }


    // ---------------------------
    //          getters
    // ---------------------------

    /**
     * returns the length (magnitude) of vector
     * @return {Number}
     */
    get length() {
        let x = this.x;
        let y = this.y;
        return this.precise(Math.sqrt(x * x + y * y));
    }

    /**
     * returns the normalized clone of vector (length to 1)
     * @return {V2D}
     */
    get normalized() {
        let cloned = this.clone();
        return cloned.normalize();
    }

    /**
     * returns the angle of vector (degrees)
     * @return {Number}
     */
    get angle() {
        return this.precise(Math.atan2(this.y, this.x) * 180 / Math.PI);
    }

    /**
     * returns the angle of vector (radians)
     * @return {Number}
     */
    get angleRD() {
        return this.precise(Math.atan2(this.y, this.x));
    }

    /**
     * returns the incline of vector (y/x)
     * @return {Number}
     */
    get incline() {
        return this.y / this.x;
    }

}

module.exports = V2D;