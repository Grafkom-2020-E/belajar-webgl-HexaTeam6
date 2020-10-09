function main(){
    var canvas  = document.getElementById("myCanvas");
    var gl      = canvas.getContext("webgl");

    var vertexShaderSource = `
    void main() {

    }`;

    var fragmentShaderSource = `
    void main() {

    }`;

    // Buat .c di GPU
    var vertexShader    = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader  = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // kompilasi .c agar menjadi .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // siapkan wadah untuk .exe (shader program)
    var shaderProgram = gl.createProgram();

    // Menyambungkan antar .o agar bisa menjadi
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // runnable context di dalam wadah .exe tadi
    gl.linkProgram(shaderProgram);

    // Mulai menggunakan konteks (cat)
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}