const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

// funcionalidade de leitura dos arquivos

function lerConteudoDoArquivo(arquivo) {
    //É usado para assincronissidade
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo);
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomedaImagem = document.querySelector(".container-imagem-nome p")

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if(arquivo){
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomedaImagem.textContent = conteudoDoArquivo.nome;
        } catch (error) {
            console.error("Erro na leitura do arquivo");
        }
    }
})

const inputTags = document.querySelector("#categoria");
const listaTags = document.getElementById("lista-tags");



// excluir tags

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
})

// limitar tags

const tagsDisponiveis = ["front-end", "programação", "Data Science", "full-stack", "HTML", "CSS", "javaScript"];

async function verificaTagsDisponiveis(tagTexto){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000)
    })
}

// add tags
inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "" ) {
            try{
                const tagExiste = await verificaTagsDisponiveis(tagTexto);
                if(tagExiste){
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`
                    listaTags.appendChild(tagNova);
                    inputTags.value = "";
                }else{
                    alert("Tag não foi encontada");
                }
            } catch (error){
                console.error("Erro ao verificar a existencia da tag")
            }
        }
    }
});

// dados do formulario

const botaoPublicar = document.querySelector(".botao-publicar");



// simular envio para o backend

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto){
    return new Promise((resolve, project) => {
        setTimeout(()=>{
            const deuCerto = Math.random() > 0.5;
            if (deuCerto) {
                resolve("Projeto publicado com sucesso!")
            }else{
                reject("Erro ao publicar o projeto")
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault();

    const nomeDoProjeto = document.getElementById("nome").value;
    const descricaoDoProjeto = document.getElementById("descricao").value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    // teste
    // console.log(nomeDoProjeto);
    // console.log(descricaoDoProjeto);
    // console.log(tagsProjeto);

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
        console.log(resultado);
        alert("deu tudo certo!");
    } catch (error) {
        console.error("Deu errado:", error);
        alert("Deu errado");
    }
});

// botão descartar
const botaoDescartar = document.querySelector("botao-descartar");
botaoDescartar.addEventListener("click", (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector("form");
    formulario.reset(); //resetar tudo so formulário

    imagemPrincipal.src = "./img/imagem1.png";
    nomedaImagem.textContent = "image_projeto.png";
    listaTags.innerHTML = "";
})