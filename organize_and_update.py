
import os
import shutil
from bs4 import BeautifulSoup

# Caminhosextracted_dir = 
'/home/ubuntu/upload/Missa'
repo_dir = '/home/ubuntu/missa'
letras_dir = os.path.join(repo_dir, 'Letras')
diversos_dir = os.path.join(letras_dir, 'Diversos')

# Mapeamento de cânticos para pastas
canticos_map = {
    'Aclamação - A vossa palavra senhor.jpeg': '5 - Aclamação Evangelho',
    'Ação de graças - Só em ti.jpeg': 'Ação de graças',
    'Comunhão - Eis que sou o pão da vida.jpeg': '9 - Comunhão',
    'Comunhão - Todo aquele que comer.jpeg': '9 - Comunhão',
    'Entrada - Creio.jpeg': '1 - Entrada',
    'Entrada - Tu és a razão da jornada.jpeg': '1 - Entrada',
    'Gloria - Gloria a Deus nas alturas.jpeg': '3 - Glória',
    'Gloria - continuação.jpeg': '3 - Glória',
    'Ofertorio - Os dons que trago aqui.jpeg': '6 - Ofertório',
    'Piedade - Senhor que viestes salvar.jpeg': '2 - Ato Penitencial',
    'Santo - Santo santo santo éh o senhor.jpeg': '7 - Santo',
}

# Criar pasta Diversos se não existir
if not os.path.exists(diversos_dir):
    os.makedirs(diversos_dir)

# Organizar arquivos


# Atualizar HTML
index_html_path = os.path.join(repo_dir, 'e-Missa.html')

if os.path.exists(index_html_path):
    with open(index_html_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Encontrar a seção onde os cânticos são listados (exemplo: uma div com id 'canticos')
    # Esta parte pode precisar de ajuste dependendo da estrutura real do HTML
    # Por simplicidade, vou adicionar uma nova seção ou lista de links
    
    # Exemplo: Adicionar links para os novos cânticos em uma lista existente ou criar uma nova
    # Supondo que haja uma <ul> com id 'canticos-list' ou similar
    canticos_list = soup.find('ul', id='canticos-list') # Ajuste o seletor conforme necessário
    if not canticos_list:
        # Se não encontrar, vamos adicionar a uma seção genérica ou criar uma nova
        body = soup.find('body')
        if body:
            new_section = soup.new_tag('div', id='novos-canticos')
            new_section.append(soup.new_tag('h2')).string = 'Novos Cânticos Adicionados'
            canticos_list = soup.new_tag('ul', id='canticos-list')
            new_section.append(canticos_list)
            body.append(new_section)
        else:
            print("Não foi possível encontrar o <body> para adicionar a seção de novos cânticos.")
            canticos_list = None

    if canticos_list:
        for filename, folder_name in canticos_map.items():
            # Caminho relativo para o HTML
            relative_path = os.path.join('Letras', folder_name, filename).replace(os.sep, '/')
            
            # Verificar se o link já existe para evitar duplicatas
            if not soup.find('a', href=relative_path):
                li = soup.new_tag('li')
                a = soup.new_tag('a', href=relative_path)
                a.string = filename.replace('.jpeg', '')
                li.append(a)
                canticos_list.append(li)
                print(f'Adicionado link para {filename} no HTML.')
            else:
                print(f'Link para {filename} já existe no HTML. Ignorando.')

        with open(index_html_path, 'w', encoding='utf-8') as f:
            f.write(str(soup.prettify()))
        print("HTML atualizado com sucesso.")
else:
    print(f"Arquivo index.html não encontrado em {index_html_path}")



