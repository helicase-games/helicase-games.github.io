import random

# Categorized Bio-Word Bank
BIO_LIBRARY = {
    "Organelles": ["MITOCHONDRIA", "RIBOSOME", "LYSOSOME", "NUCLEOLUS", "CHLOROPLAST"],
    "Genetics": ["NUCLEOTIDE", "TELOMERE", "EPIGENETICS", "HETEROZYGOUS", "METHYLATION"],
    "Techniques": ["ELECTROPHORESIS", "SEQUENCING", "CRYSTALLOGRAPHY", "PIPETTING"],
    "Bioinformatics": ["ALIGNMENT", "PHYLOGENY", "HEURISTIC", "PROTEOMICS", "ALGORITHM"]
}

def fetch_new_game():
    category = random.choice(list(BIO_LIBRARY.keys()))
    word = random.choice(BIO_LIBRARY[category])
    return {
        "category": category,
        "word": word,
        "length": len(word)
    }

if __name__ == "__main__":
    # Test your logic
    game = fetch_new_game()
    print(f"Game Ready! Category: {game['category']} | Word: {game['word']}")