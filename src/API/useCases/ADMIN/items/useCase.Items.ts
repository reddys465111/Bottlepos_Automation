import { ScenarioItems } from "../../../../utils";

import { Categories_Edit, Categories_Get, Categories_Add, Categories_Delete } from "./categories/useCase.Categories";
import { CategoryGroup_Add, CategoryGroup_Delete, CategoryGroup_Edit, CategoryGroup_Get } from "./categoryGroups";
import { Items_Add, Items_Delete, Items_Edit, Items_Get } from "./items";
import { Promotion_Get, Promotion_Delete, Promotion_Edit, Promotion_Add } from "./promotions";

import { Sizes_Add, Sizes_Delete, Sizes_Edit, Sizes_Get } from "./sizes";

export const Items_LoadArgs = async (iItems: ScenarioItems): Promise<void> => {

    if (iItems) {
        console.log('Loading Items');
    }
    if (iItems.CategoryGroups) {
        const categoryGroups = iItems.CategoryGroups;
        for (let i = 0; i < categoryGroups.length; i++) {
            const catGroup = categoryGroups[i];
            const categoryGroupExists = await CategoryGroup_Get({ Name: catGroup.Name });

            if (categoryGroupExists) {
                //Delte the category group
                if (catGroup.Delete) {
                    const DeleteCatG = await CategoryGroup_Delete(categoryGroupExists);
                } else {
                    //Edit the Category group
                    const EditCatG = await CategoryGroup_Edit(catGroup, categoryGroupExists);
                }
            } else {
                //Add the category group
                const AddCatG = await CategoryGroup_Add(catGroup);
            }
        }
    }

    if (iItems.Categories) {
        const categories = iItems.Categories;
        for (let i = 0; i < categories.length; i++) {
            const cat = categories[i];
            const categoryExtists = await Categories_Get(cat);
            if (categoryExtists) {
                if (cat.Delete) {
                    const DeleteCat = await Categories_Delete(categoryExtists);
                } else {
                    const EditCat = await Categories_Edit(cat, categoryExtists);
                }
            } else {
                const AddCat = await Categories_Add(cat);
            }
        }
    }

    if (iItems.Sizes) {
        const sizes = iItems.Sizes;
        for (let i = 0; i < sizes.length; i++) {
            const size = sizes[i];
            const existsSize = await Sizes_Get({ name: size.Name });
            if (existsSize) {
                if (size.Delete) {
                    // Delete the Size
                    const DeleteSize = await Sizes_Delete(existsSize);
                } else {
                    // Edit an existing Size
                    const EditSize = await Sizes_Edit(size, existsSize);
                }
            } else {
                // Add a new Size
                const AddSize = await Sizes_Add(size);
            }
        }
    }

    if (iItems.Items) {
        const itemsLoaded = iItems.Items;
        for (let i = 0; i < itemsLoaded.length; i++) {
            const element = itemsLoaded[i];
            const existingItem = await Items_Get(element);
            if (existingItem) {
                if (element.Delete) {
                    //Delete Item
                    try {
                        const DeleteItem = await Items_Delete(existingItem);
                    } catch (error) {
                        console.log('Error deleting item', existingItem.name, error);
                    }
                } else {
                    //Edit Item
                    try {
                        const EditItem = await Items_Edit(element, existingItem);
                    } catch (error) {
                        console.log('Error editing item', existingItem.name, error);
                    }
                }
            } else {
                //Add item
                try {
                    const AddItem = await Items_Add(element);
                } catch (error) {
                    console.log('Error adding item', element.Name, error);
                }
            }
        }
    }
    
    if(iItems.Promotions){
        const promotionLoaded = iItems.Promotions;
        for(let i=0; i<promotionLoaded.length; i++){
            const element = promotionLoaded[i];
            const existingPromotion = await Promotion_Get(element);
            if(existingPromotion){
                if(element.Delete){
                    //Delete Promotion
                    const DeletePromotion = await Promotion_Delete(existingPromotion);
                }else{
                    //Edit Promotion
                    const EditPromotion = await Promotion_Edit(element, existingPromotion);
                }
            }else{
                //Add Promotion
                const AddPromotion = await Promotion_Add(element);
            }
        }
    }
}