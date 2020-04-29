require('ignore-styles')

require('@babel/register')({ // converte para js que o node consegue entender;
  ignore: [/(node_module)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./server') // antes de cheagar aqui ele faz a conversão ai para cima;

// por que usar o require nestes casos?
// talvez por causa do formato que é suportado pelo node.

// ele vai afetando todos os arquivos e encontra o arquivo específico da página que eu estava querendo;
