export const fakeSearchAPI = async (query) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        'answer': `Voici un résumé généré par IA pour la recherche "${query}". Ce résumé synthétise les informations clés des résultats trouvés.`,
        'followup_questions': [
          `Que signifie ${query} en détail ?`,
          `Quelles sont les applications de ${query} ?`,
          `Comment ${query} a-t-il évolué au fil du temps ?`
        ],
        'relevants_documents': [
          {
            'content': `Ceci est le contenu du premier résultat pertinent pour "${query}".`,
            'title': `${query} - Aperçu général`,
            'urls': `https://example.com/${query.toLowerCase().replace(' ', '-')}-1`,
          },
          {
            'content': `Voici des informations supplémentaires sur "${query}" dans le deuxième résultat.`,
            'title': `Comprendre ${query} en profondeur`,
            'urls': `https://example.com/${query.toLowerCase().replace(' ', '-')}-2`,
          },
          {
            'content': `Le troisième résultat offre une perspective différente sur "${query}".`,
            'title': `${query} : Une analyse critique`,
            'urls': `https://example.com/${query.toLowerCase().replace(' ', '-')}-3`,
          },
        ]
    };
  };