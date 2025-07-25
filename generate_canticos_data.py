#!/usr/bin/env python3
import os
import json

def generate_canticos_data():
    letras_dir = '/home/ubuntu/missa/Letras'
    
    # Mapeamento das pastas para categorias do HTML
    folder_to_category = {
        '1 - Entrada': 'Entrada',
        '2 - Ato Penitencial': 'Ato Penitencial', 
        '3 - Glória': 'Glória',
        '5 - Aclamação Evangelho': 'Aclamação',
        '6 - Ofertório': 'Ofertas',
        '7 - Santo': 'Santo',
        'Abraço de Paz': 'Paz',
        '8 - Cordeiro de Deus': 'Cordeiro',
        '9 - Comunhão': 'Comunhão',
        'Ação de graças': 'Pós-Comunhão',
        '10 - Final': 'Final',
        'Cantos Marianos': 'Nossa Senhora',
        'Louvor e Meditação': 'Adoração',
        'A': 'Espírito Santo',
        'Diversos': 'Outros'
    }
    
    # Categorias especiais que não têm pastas correspondentes
    special_categories = {
        'Natal': [],
        'Quarema': [],
        'Páscoa': [],
        'Pentecostes': []
    }
    
    canticos_data = {}
    
    # Inicializar todas as categorias
    for category in folder_to_category.values():
        canticos_data[category] = []
    
    for special_cat in special_categories:
        canticos_data[special_cat] = special_categories[special_cat]
    
    # Percorrer as pastas e coletar arquivos
    if os.path.exists(letras_dir):
        for folder_name in os.listdir(letras_dir):
            folder_path = os.path.join(letras_dir, folder_name)
            if os.path.isdir(folder_path):
                category = folder_to_category.get(folder_name, 'Outros')
                
                for file_name in os.listdir(folder_path):
                    if file_name.lower().endswith(('.pdf', '.jpeg', '.jpg', '.png')):
                        # Limpar o nome do arquivo para exibição
                        display_name = file_name
                        # Remover prefixos comuns
                        for prefix in ['Entrada - ', 'Comunhão - ', 'Ofertorio - ', 'Gloria - ', 'Santo - ', 'Aclamação - ', 'Ação de graças - ', 'Piedade - ']:
                            if display_name.startswith(prefix):
                                display_name = display_name[len(prefix):]
                        
                        # Remover extensão para exibição
                        display_name = os.path.splitext(display_name)[0]
                        
                        # Capitalizar primeira letra de cada palavra
                        display_name = ' '.join(word.capitalize() for word in display_name.replace('_', ' ').split())
                        
                        cantico = {
                            'name': display_name,
                            'file': file_name,
                            'path': f'Letras/{folder_name}/{file_name}',
                            'type': 'pdf' if file_name.lower().endswith('.pdf') else 'image'
                        }
                        
                        canticos_data[category].append(cantico)
    
    # Salvar dados em JSON
    with open('/home/ubuntu/missa/canticos_data.json', 'w', encoding='utf-8') as f:
        json.dump(canticos_data, f, ensure_ascii=False, indent=2)
    
    print("Dados dos cânticos gerados com sucesso!")
    print(f"Total de categorias: {len(canticos_data)}")
    for category, canticos in canticos_data.items():
        print(f"{category}: {len(canticos)} cânticos")

if __name__ == "__main__":
    generate_canticos_data()

