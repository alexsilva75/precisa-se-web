import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAndSetUsers } from "../../store/redux/users-actions";
import { AnyAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../store/redux";
import { useContext } from "react";
import AuthContext from "../../store/auth";
import { Link, useSearchParams } from "react-router-dom";
const UsersIndexPage = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: any) => state.users.users);
  const context = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  useEffect(() => {
    const firstInitial = searchParams.get("firstInitial");
    dispatch(fetchAndSetUsers({ firstInitial, token: context?.token }));
    //console.log("Search Params: ", firstInitial);
  }, [dispatch, context?.token, searchParams]);

  useEffect(() => {
    console.log("Users", users);
  }, []);
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex flex-wrap">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>

          {alphabet.map((letter: string) => (
            <li className="page-item" key={letter} v-for="letter in alphabet">
              <Link className="page-link" to={`?firstInitial=${letter}`}>
                {letter}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Usuários</h3>

              <div className="card-tools">
                <div
                  className="input-group input-group-sm"
                  style={{ width: 150 }}
                >
                  <input
                    type="text"
                    name="table_search"
                    className="form-control float-right"
                    placeholder="Search"
                  />

                  <div className="input-group-append">
                    <button type="submit" className="btn btn-default">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- /.card-header --> */}
            <div className="card-body table-responsive p-0">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>
                        <Link className="btn btn-info" to={`${user.id}`}>
                          Detalhes
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersIndexPage;
