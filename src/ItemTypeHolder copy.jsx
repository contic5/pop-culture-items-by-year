import ItemYearElement from "./ItemYearElement";

function ItemTypeHolder(props)
{
    let item_name=props.item_type_name;
    const accordion_id="accordion"+item_name;

    let item_year_elements=[];
    const item_year_groups=props.item_year_groups;
    console.log(item_year_groups);
    for(let i=0;i<item_year_groups.length;i++)
    {
        const item_year_group=item_year_groups[i];

        /*
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h4 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Accordion Item #1
              </button>
            </h4>
            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionExample" style="">
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h4 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Accordion Item #2
              </button>
            </h4>
            <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample" style="">
              <div class="accordion-body">
                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h4 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Accordion Item #3
              </button>
            </h4>
            <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
        */

        const aria_expanded=(i==0);

        let div_classname="accordion-collapse collapse show";
        if(i>0)
        {
            div_classname="accordion-button collapsed";
        }

        const collapse_id="collapse"+item_year_group.item_name+"_"+i;

        let item_year_element=<ItemYearElement key={i} year={item_year_group.year} distance={item_year_group.distance} items={item_year_group.items} important_columns={item_year_group.important_columns} item_name={item_year_group.item_name}></ItemYearElement>
        
        let item_year_element_holder=
        (
        <div className="accordion-item">
        <h4 className="accordion-header">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#"+collapse_id} aria-expanded={aria_expanded} aria-controls={collapse_id}>
        Accordion Item #{i+1}
        </button>
        </h4>
        <div id={collapse_id} className={div_classname} data-bs-parent={"#"+accordion_id}>
        <div className="accordion-body">
        <p>Test</p>
        </div>
        </div>
        </div>
        );

        item_year_elements.push(item_year_element_holder);
    }

    return (
        <>
        <h2>Item Type Holder</h2>
        <div className="accordion" id={accordion_id}>
        {item_year_elements}
        </div>
        </>
    )
}

export default ItemTypeHolder;