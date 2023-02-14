import styles from "./ProfilePage.module.scss";
import { mockUser } from "../../utils/mockData";
import { useSelector } from "react-redux";
import { selectDataUser } from "../../redux/selectors";
import { useRef, useEffect, useState, useCallback, FormEvent } from "react";

import { Dropdown } from "../../components/Dropdown/Dropdown";
import { ApiService } from "../../api/ApiService";
import { games as mockGames } from "../../utils/mockData";

export default function ProfilePage() {
  const ref = useRef<HTMLFormElement>(null);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectGame, setSelectGame] = useState(null);
  const [allGames, setAllGames] = useState<any>([]);
  useEffect(() => {
    getGames();
  }, []);

  const dataUser = useSelector(selectDataUser);

  const getGames = async () => {
    // const api = new ApiService();
    // const games = await api.getGames();
    setAllGames(mockGames)



  };

  const sendSellerExist = async (dataSeller: any) => {
    const apiService = new ApiService();
    await apiService.sellerExist(dataSeller);
  };

  const options = allGames.map((item: any, index: number) => {
    const newArray = {
      value: index,
      label: item.name,
      description: item.description,
    };

    return newArray;
  });
  

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const validNumber = phoneNumber.replace(/\D/g, "").replace(/^7/, "8");
      const dataSeller = {
        username: dataUser.username,
        phone_number: validNumber,
      };
      sendSellerExist(dataSeller);
      console.log(selectGame);
    },
    [selectGame, phoneNumber, dataUser]
  );

  return (
    <div className={styles.container}>
      <div className={styles.container_left}>
        <div className={styles.body}>
          <div className={styles.bodyTop}>Информация об аккаунте</div>
          <div className={styles.content}>
            <div className={styles.contentLeft}>
              <div>
                <img src={mockUser.avatar} />
                <p>{mockUser.status}</p>
              </div>
              <div>
                <span>Ваш статус:</span>
                <span>Логин:</span>
                <span>E-mail:</span>
                <span>Баланс:</span>
              </div>
            </div>
            <div className={styles.contentRight}>
              <span>{mockUser.role}</span>
              <span>{dataUser.username || "Tanos"}</span>
              <span>{dataUser.email || "Tanos@mail.ru"}</span>
              <span>{mockUser.balance} p</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_right}>
        <div className={styles.title}>Хотите стать продавцом ?</div>

        <form className={styles.formSeller} onSubmit={handleSubmit} ref={ref}>
          <input
            value={phoneNumber}
            onChange={(e): void => setPhoneNumber(e.target.value)}
            className={styles.sellerNumber}
            type="text"
            placeholder="номер телефона"
          />

          <Dropdown options={options} setSelectValue={setSelectGame} />

          <button className={styles.button}>Отправить форму</button>
        </form>
      </div>
    </div>
  );
}
