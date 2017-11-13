
//variaveis para determinar a exibição por tipos de produto
var importado = window.location.href.indexOf('/importados') > 0;
var nacional = window.location.href.indexOf('/nacionais') > 0;


if (importado || nacional) {
    $("#carousel").html('');
    // $("#carousel").css('min-height','10px');
}
//

//assim que a pagina carregar, execute o que esta dentro
$(document).ready(function () {
    
    //verificar se o usuario está logado e possui sessao
    if($.session.get('usuario') != 'null'){

        console.log($.session.get('usuario'));

        $("#cadastrar").parent().parent().append('<li class="nav-item"><a href="#" class="nav-link" >Carrinho</a></li>');
        $("#cadastrar").hide();

        $("#login").html('Logout');

        $("#login").parent().parent().append('<li class="nav-item"><p class="nav-link" style="border-right:1px solid;">Olá ' + $.session.get('usuario') + '</p></li>');
        
    }
    //

    //carrega a lista de produtos do banco de dados
    $.post('/produtos', {
        id: "produtos"
    }, function (res) {
        console.log(res);

        for (var produto of res.docs[0].produtos) {

            if (importado && produto.tipo !== "importado") {
                continue;
            }

            if (nacional && produto.tipo !== "nacional") {
                continue;
            }

            //botao para adicionar item no carrinho
            var btnCarrinho = '<i class="material-icons float-right">add_shopping_cart</i>'
            
            //html para gerar o card do bootstrap dinamicamente
            var html = '<div class="col-lg-4 col-md-6 mb-4">\
        <div class="card h-100">\
          <a href="#">\
            <img class="card-img-top" src="images/' + produto.imagem + '" alt="">\
          </a>\
          <div class="card-body">\
            <h4 class="card-title">\
              <a href="#">' + produto.nome + '</a>\
            </h4>\
            <h5>R$' + produto.preço + ',00/Kg</h5>\
            <p class="card-text">' + produto.descricao + '</p>\
          </div>\
          <div class="card-footer">\
            <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>\
            '+( $.session.get('usuario') != 'null' ? btnCarrinho :  '')+'\
          </div>\
        </div>\
      </div>';

            $("#productsDiv").append(html);

        }
    });
    //---------------------

    //abre o modal de login caso o usuario nao esteja logado, ou desloga o usuario
    $("#login").click(function () {
        if($.session.get('usuario') != 'null'){
            $.session.set('usuario',null);
            window.location.href='/';
        }else{
        $("#loginModal").modal('toggle');
        }
    });
    //

    //pega a lista de paises para alimentar o select de países
    $.get('/countries', function (data) {
        $('#countries').append(data);
    });
    //

    //requisição para cadastrar um novo usuario
    $("#formCadastro").submit(function () {

        var email = $("#email").val(),
            senha = $("#senha").val(),
            local = $("#countries option:selected").text(),
            perfil = $('input[name=rgroup]:checked').val(),
            nome = $("#name").val(),
            razaoSocial = $("#razao").val();

        //objeto do usuario para ser cadastrado no banco
        var userObj = {
            id: email,
            senha,
            local,
            perfil,
            nome,
            razaoSocial
        };

        $.post('/users/create', userObj, function (data) {

            $('#myModal').modal('toggle');

            $("#myModal").on('hidden.bs.modal', function () {
                window.location.href = '/';
            });
        });

        return false;

    });
    //

    //requisição de login
    $('#loginModal').submit(function () {
        var email = $('#loginEmail').val(),
            senha = $('#loginSenha').val();

        data = {
            id: email,
            senha
        }

        $("#message").html("");

        $.post('/users/login', data, function (res) {
            console.log(res);

            if (res.status === "NOT_OK") {
                $("#message").html("Usuario ou senha incorretos!");
            }else{

                $.session.set('usuario',res.nome);

                window.location.href = '/';

            }



        });

        return false;
    });

    //navegação do carousel
    $('#buttonNext').click(function(){
        $('#carousel').carousel('next');
    });

    $('#buttonPrev').click(function(){
        $('#carousel').carousel('prev');
    });
    //


});