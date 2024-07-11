import { useNavigate } from "react-router-dom";

function CategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/categories/${category.category_id}/products`)}
      className="card d-flex flex-column justify-content-center align-items-center mx-2 my-1"
    >
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 className="card-title fs-4">{category.name}</h5>
      </div>
    </div>
  );
}

export default CategoryCard;
