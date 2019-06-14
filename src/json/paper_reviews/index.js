const filenames = [
  "koch_pinwheels.json",
  "koulakov_chklovskii_wiring_cost.json",
  "livingstone_hubel_color.json",
  "nauhaus_orthogonality.json",
  "ponce_livingstone_super_stimuli.json",
  "ringach_orientation_selectivity.json",
  "hubel_wiesel_v2v3.json",
  "dicarlo_untangling.json",
  "olshausen_field_sparse_coding.json",
  "kriegeskorte_monkey_human.json",
  "grill_spector_functional_architecture.json",
  "devalois_direction_selectivity.json",
  "ackman_retinal_waves.json",
  "afraz_inactivation_face_gender.json",
  "rajalingham_inactivation.json",
  "bracci_ventral_shape.json"
];

const filenames_with_prefix = filenames.map(filename => {
  return "review_jsons/" + filename;
});

export default filenames_with_prefix;
