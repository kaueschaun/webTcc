import React, { useEffect, useState } from "react";
import HeaderColab from "../../components/header/HeaderColab";
import api from "../../services/api";
import "./styles.scss";
import dayjs from "dayjs";
import addTask from "../../assets/img/add-task.png";
import Delete from "../../assets/img/delete.png";

const Tarefas = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [visible, setVisible] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [fishTask, setFishTask] = useState(false)

  function formatDate(date) {
    return dayjs(date).format("DD/MM/YYYY");
  }
 

  function visibleEnable() {
    setVisible(true);
    if(visible === true) {
      setVisible(false)
    }
    
  }
  const finishTask = (id_tarefas_projetos) => {
    const dados = {
      id_tarefas_projetos,
    }
    api.put(`/tarefasProjetos`, dados,{
      headers: {
        Authorization: `Bearer ` + token,
      },
    })
    window.location.reload();

  }

  async function handleDelete(id_tarefas_projetos) {
    const token = localStorage.getItem("token");
    if (window.confirm("Deseja realmente excluir essa tarefa?")) {
     await api.delete(`/tarefasProjetos/` + id_tarefas_projetos, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      });
      window.location.reload();
    }
  }
  const token = localStorage.getItem("token");
  const submitTak = (e) => {
    e.preventDefault();

    const colaboradores_idcolaboradores = localStorage.getItem("id");

    const dados = {
      nome,
      descricao,
      colaboradores_idcolaboradores,
    };
    if (nome.length === "" || nome.length <= 5) {
      alert("Insira o nome da task corretamente!");
      setNome("");
      return;
    }
    if (descricao.length === "" || descricao.length <= 5) {
      alert("Insira a descrição task!");
      setDescricao("");
      return;
    }
  
    api.post(`/tarefasProjetos`, dados, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });
    setVisible(false);
    window.confirm("Deseja realmente adicionar uma task?")
    window.location.reload();
  };

  useEffect(() => {
    const colaboradores_idcolaboradores = localStorage.getItem("id");

    api
      .get(`/tarefasProjetos/` + colaboradores_idcolaboradores, {
        headers: {
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        let count = 0;
        {response.data.response.map(
          (tarefas) => {
            tarefas.data = formatDate(tarefas.data)
            if(tarefas.data_termino !== null)  {
              count++;
              tarefas.data_inicio = formatDate(tarefas.data_inicio)
              tarefas.data_termino = formatDate(tarefas.data_termino)
            }
            if(response.data.response.length === count) {
              setFishTask(false)
              
            }
            
          });
        }
        setTarefas(response.data.response);
      });
  },[]);

  return (
    <div>
      <HeaderColab />
      <div className="container-task">
        <div className="content-task">
          <button className="add-task" onClick={() => visibleEnable()}>
            <img src={addTask} alt="Adicionar" className="img-task" />
            Adicionar
          </button>

          {visible && (
            <div className="content-add-task">
              <form onSubmit={submitTak}>
                <p className="title-name">Nome da Tarefa:</p>
                <input
                  className="input-name"
                  onChange={(e) => setNome(e.target.value)}
                ></input>
                <p className="title-description">Descrição:</p>
                <input
                  className="input-description"
                  onChange={(e) => setDescricao(e.target.value)}
                ></input>
                <button className="add-task-form">Adicionar</button>
              </form>
            </div>
          )}
          {tarefas
            .filter((tarefas) => tarefas.data_termino === null)
            .map((tarefas) => (
              <li className="list-task">
                <div className="content-list-task">
                  <p className="txt-name">Nome da Tarefa</p>
                  <span className="txt-task">{tarefas.nome}</span>
                </div>
                <div className="content-description">
                  <p className="txt-description">Descrição</p>
                  <span className="txt-task">{tarefas.descricao}</span>
                </div>
                <div className="content-btn-finish">
                  <button
                    className="btn-finish"
                    onClick={() => finishTask(tarefas.id_tarefas_projetos)}
                  >
                    Finalizar Tarefa
                  </button>
                  <button
                    onClick={() => handleDelete(tarefas.id_tarefas_projetos)}
                    className="button-delete"
                  >
                    <img src={Delete} alt="delete" />
                  </button>
                </div>
              </li>
            ))}
          
            {tarefas
              .filter((tarefas) => tarefas.data_termino !== null)
              .map((tarefas) => (
                <li className="list-task">
                  <div className="content-list-task">
                    <p className="txt-name">Nome da Tarefa</p>
                    <span className="txt-task">{tarefas.nome}</span>
                  </div>
                  <div className="content-description">
                    <p className="txt-description">Descrição</p>
                    <span className="txt-task">{tarefas.descricao}</span>
                  </div>
                  {fishTask && (
                    <button
                      onClick={() => finishTask(tarefas.id_tarefas_projetos)}
                    >
                      Finalizar tarefa
                    </button>
                  )}

                  <div className="content-fish">
                    <p className="txt-finish">Hora</p>
                    <span className="txt-data-finish">{tarefas.hora}</span>
                    <p className="txt-finish">Data Inicio</p>
                    <span className="txt-data-finish">{tarefas.data_inicio}</span>
                  </div>
                  <div className="content-fish">
                    <p  className="txt-finish">Hora Termino</p>
                    <span className="txt-data-finish">{tarefas.hora_termino}</span>
                    <p className="txt-finish">Data Termino</p>
                    <span className="txt-data-finish">{tarefas.data_termino}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(tarefas.id_tarefas_projetos)}
                    className="button-delete"
                  >
                    <img src={Delete} alt="delete" />
                  </button>
                </li>
              ))}
          
        </div>
      </div>
    </div>
  );
};
export default Tarefas;
