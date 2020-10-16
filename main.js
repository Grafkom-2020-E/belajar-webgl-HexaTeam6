function main(){
    var canvas  = document.getElementById("myCanvas");
    var gl      = canvas.getContext("webgl");

    // Definisi data vertex 3 buah titik
    /**
     * Titik A (-0.5, -0.5)
     * Titik B (0.5, -0.5)
     * Titik C (0.5, 0.5)
     * Titik D (-0.5, 0.5)
     */
    var vertices = [
        0.5, -0.5, //Titik B
        -0.5, -0.5, //Titik A
        0.5, 0.5, //Titik C
        -0.5, 0.5, //Titik A
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderSource = document.getElementById("vertexShaderSource").text;
    var fragmentShaderSource = document.getElementById("fragmentShaderSource").text;

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

    // Ajarkan atribute a_Position di GPU 
    // tentang pengambilan data vertex dari ARRAY_BUFFER
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPositionLoc = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(
        aPositionLoc, 
        2, 
        gl.FLOAT, 
        false, 
        0, 
        0);
    gl.enableVertexAttribArray(aPositionLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(100, 0, 600, 600);
    
    var primitive = gl.TRIANGLE_STRIP;
    var offset = 0;
    var nVertex = 4;
    gl.drawArrays(primitive, offset, nVertex);
}