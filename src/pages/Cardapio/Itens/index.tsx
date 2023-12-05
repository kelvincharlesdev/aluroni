import { useEffect, useState } from "react";
import { Item } from "./Item";
import cardapio from "./itens.json";
import styles from "./Itens.module.scss";

interface Props {
  busca: string;
  filtro: number | null;
  ordenador: string;
}

export const Itens = ({ busca, filtro, ordenador }: Props) => {
  const [lista, setLista] = useState(cardapio);

  const testaBusca = (title: string) => {
    const regex = new RegExp(busca, "i");
    return regex.test(title);
  };

  const testaFiltro = (id: number) => {
    if (filtro !== null) return filtro === id;

    return true;
  };

  const ordenar = (novaLista: typeof cardapio) => {
    switch (ordenador) {
      case "porcao":
        return novaLista.sort((a, b) => (a.size > b.size ? 1 : -1));
      case "qtd_pessoas":
        return novaLista.sort((a, b) => (a.serving > b.serving ? 1 : -1));
      case "preco":
        return novaLista.sort((a, b) => (a.price > b.price ? 1 : -1));
      default:
        return novaLista;
    }
  };

  useEffect(() => {
    const novaLista = cardapio.filter(
      (item) => testaBusca(item.title) && testaFiltro(item.category.id)
    );

    setLista(ordenar(novaLista));
  }, [busca, filtro, ordenador]);

  return (
    <div className={styles.itens}>
      {lista.map((item) => (
        <Item
          key={item.id}
          title={item.title}
          description={item.description}
          id={item.id}
          photo={item.photo}
          price={item.price}
          serving={item.serving}
          category={item.category}
          size={item.size}
        />
      ))}
    </div>
  );
};
