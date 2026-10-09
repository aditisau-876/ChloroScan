def normalize_name(name):
    """
    Normalize a plant name so that small differences
    in formatting do not cause false disagreements.
    """

    if not name:
        return ""

    name = name.lower()

    for char in [
        "(", ")", ",", ".", "-", "_"
    ]:
        name = name.replace(char, " ")

    name = " ".join(name.split())

    return name


def names_are_similar(
    api_scientific_name,
    api_common_names,
    our_scientific_name,
    our_plant_name
):
    """
    Compare Pl@ntNet's identification with our model.

    Scientific names have priority because they are
    more precise than common names.
    """

    if not api_scientific_name:
        return False

    api_scientific = normalize_name(
        api_scientific_name
    )

    our_scientific = normalize_name(
        our_scientific_name
    )

    our_common = normalize_name(
        our_plant_name
    )

    # ==============================================
    # 1. SCIENTIFIC NAME MATCH
    # ==============================================

    if (
        api_scientific
        and our_scientific
        and api_scientific == our_scientific
    ):
        return True

    # ==============================================
    # 2. COMMON NAME MATCH
    # ==============================================

    for common_name in api_common_names or []:

        normalized_common = normalize_name(
            common_name
        )

        if not normalized_common:
            continue

        if normalized_common == our_common:
            return True

        if (
            normalized_common in our_common
            or our_common in normalized_common
        ):
            return True

    return False


def build_identification_result(
    our_result,
    plantnet_result
):
    """
    Combine our existing TensorFlow prediction
    with Pl@ntNet.

    IMPORTANT:
    Pl@ntNet is the PRIMARY identification source.
    Our model is used for verification/support.
    """

    # ==================================================
    # CASE 1: PLANTNET FAILED
    # ==================================================

    if not plantnet_result.get("success"):

        return {
            "status": "plantnet_unavailable",
            "primary_source": "our_model",
            "verified": False,

            "final_prediction": None,

            "our_model": our_result,
            "plantnet": plantnet_result
        }

    api_prediction = plantnet_result.get(
        "best_prediction"
    )

    if not api_prediction:

        return {
            "status": "plantnet_no_result",
            "primary_source": "our_model",
            "verified": False,

            "final_prediction": None,

            "our_model": our_result,
            "plantnet": plantnet_result
        }

    # ==================================================
    # PLANTNET INFORMATION
    # ==================================================

    api_scientific_name = api_prediction.get(
        "scientific_name"
    )

    api_common_names = api_prediction.get(
        "common_names",
        []
    )

    api_confidence = float(
        api_prediction.get(
            "confidence",
            0
        )
    )

    # ==================================================
    # OUR MODEL INFORMATION
    # ==================================================

    our_prediction = None

    if our_result:

        result = our_result.get(
            "result"
        )

        if result:

            our_prediction = {
                "model_name": result.get(
                    "model_name"
                ),

                "scientific_name": result.get(
                    "scientific_name"
                ),

                "plant_name": result.get(
                    "plant_name"
                ),

                "confidence": result.get(
                    "confidence",
                    0
                )
            }

    our_scientific_name = None
    our_plant_name = None

    if our_prediction:

        our_scientific_name = (
            our_prediction.get(
                "scientific_name"
            )
        )

        our_plant_name = (
            our_prediction.get(
                "plant_name"
            )
        )

    # ==================================================
    # COMPARE BOTH SYSTEMS
    # ==================================================

    agreement = names_are_similar(
        api_scientific_name,
        api_common_names,
        our_scientific_name,
        our_plant_name
    )

    # ==================================================
    # CASE 1:
    # API CONFIDENT + OUR MODEL AGREES
    # ==================================================

    if api_confidence >= 80 and agreement:

        return {
            "status": "confirmed",

            "primary_source": "plantnet",

            "verified": True,

            "final_prediction": {
                "scientific_name": api_scientific_name,

                "common_names": api_common_names,

                "confidence": api_confidence
            },

            "our_model": our_prediction,

            "plantnet": api_prediction
        }

    # ==================================================
    # CASE 2:
    # API CONFIDENT + OUR MODEL DISAGREES
    #
    # PLANTNET STILL WINS
    # ==================================================

    if api_confidence >= 80 and not agreement:

        return {
            "status": "api_primary_conflict",

            "primary_source": "plantnet",

            "verified": False,

            "final_prediction": {
                "scientific_name": api_scientific_name,

                "common_names": api_common_names,

                "confidence": api_confidence
            },

            "our_model": our_prediction,

            "plantnet": api_prediction
        }

    # ==================================================
    # CASE 3:
    # API LOW CONFIDENCE
    #
    # OUR MODEL CAN SUPPORT THE RESULT
    # ==================================================

    if our_prediction:

        our_confidence = float(
            our_prediction.get(
                "confidence",
                0
            )
        )

        if our_confidence >= 75:

            return {
                "status": "our_model_support",

                "primary_source": "our_model",

                "verified": False,

                "final_prediction": {
                    "scientific_name": (
                        our_prediction.get(
                            "scientific_name"
                        )
                    ),

                    "plant_name": (
                        our_prediction.get(
                            "plant_name"
                        )
                    ),

                    "confidence": our_confidence
                },

                "our_model": our_prediction,

                "plantnet": api_prediction
            }

    # ==================================================
    # CASE 4:
    # BOTH UNCERTAIN
    # ==================================================

    return {
        "status": "uncertain",

        "primary_source": None,

        "verified": False,

        "final_prediction": None,

        "our_model": our_prediction,

        "plantnet": api_prediction
    }